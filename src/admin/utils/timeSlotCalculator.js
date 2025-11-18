/**
 * Time Slot Calculator
 * Calculates available delivery time slots based on:
 * - Existing deliveries for the day
 * - Distance from warehouse or previous delivery
 * - Estimated travel and delivery times
 */

// Warehouse location (Shire Fuels depot)
const WAREHOUSE = {
  postcode: 'GL14 2PO',
  lat: 51.8228,
  lng: -2.5001
}

// Time constants (in minutes)
const DELIVERY_DURATION = 30 // Average time for delivery
const WORKING_DAY_START = 8 * 60 // 8:00 AM in minutes
const WORKING_DAY_END = 17 * 60 // 5:00 PM in minutes
const TIME_SLOT_INTERVAL = 30 // 30-minute slots
const TIME_BUFFER = 15 // 15-minute buffer added to travel time

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959 // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

/**
 * Estimate travel time in minutes based on distance
 * Assumes average speed of 30 mph in rural areas
 */
export function estimateTravelTime(distanceMiles) {
  const averageSpeed = 30 // mph
  const timeHours = distanceMiles / averageSpeed
  return Math.ceil(timeHours * 60) // Convert to minutes
}

/**
 * Convert postcode to coordinates using Postcodes.io (Free UK Postcode API)
 * No API key required!
 * Throws error if postcode cannot be found - no fallback to ensure accuracy
 */
export async function postcodeToCoordinates(postcode) {
  // Remove spaces and format postcode
  const formattedPostcode = postcode.replace(/\s/g, '').toUpperCase()

  // Use Postcodes.io - Free UK postcode API (no key required)
  const response = await fetch(
    `https://api.postcodes.io/postcodes/${formattedPostcode}`
  )

  if (!response.ok) {
    throw new Error(`Postcode '${postcode}' not found`)
  }

  const data = await response.json()

  if (data.status === 200 && data.result) {
    return {
      lat: data.result.latitude,
      lng: data.result.longitude
    }
  }

  throw new Error(`Invalid postcode '${postcode}'`)
}

/**
 * Convert time in minutes since midnight to HH:MM format
 */
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

/**
 * Calculate available time slots for a delivery on a specific date
 * @param {Date} date - The delivery date
 * @param {Array} existingDeliveries - Existing deliveries for that date
 * @param {Object} newDeliveryLocation - { lat, lng } of new delivery
 * @returns {Array} Available time slots with format { time: "HH:MM", label: "HH:MM - HH:MM" }
 */
export async function calculateAvailableTimeSlots(date, existingDeliveries, newDeliveryLocation) {
  const availableSlots = []

  // Sort existing deliveries by time
  const sortedDeliveries = [...existingDeliveries].sort((a, b) => {
    const timeA = a.delivery_time_slot?.split('-')[0] || '00:00'
    const timeB = b.delivery_time_slot?.split('-')[0] || '00:00'
    return timeA.localeCompare(timeB)
  })

  // If no deliveries, calculate from warehouse
  if (sortedDeliveries.length === 0) {
    const distance = calculateDistance(
      WAREHOUSE.lat,
      WAREHOUSE.lng,
      newDeliveryLocation.lat,
      newDeliveryLocation.lng
    )
    const travelTime = estimateTravelTime(distance)
    const earliestStart = WORKING_DAY_START + travelTime + TIME_BUFFER

    // Generate slots from earliest possible time
    for (let time = earliestStart; time <= WORKING_DAY_END - DELIVERY_DURATION; time += TIME_SLOT_INTERVAL) {
      const startTime = minutesToTime(time)
      const endTime = minutesToTime(time + DELIVERY_DURATION)
      availableSlots.push({
        time: startTime,
        label: `${startTime} - ${endTime}`,
        distance: distance.toFixed(1),
        travelTime: travelTime
      })
    }
  } else {
    // Calculate slots between existing deliveries
    let currentTime = WORKING_DAY_START

    for (let i = 0; i <= sortedDeliveries.length; i++) {
      let slotStart, slotEnd, fromLocation

      if (i === 0) {
        // Before first delivery - calculate from warehouse
        fromLocation = WAREHOUSE
        const firstDeliveryTime = timeToMinutes(sortedDeliveries[0].delivery_time_slot?.split('-')[0] || '09:00')
        slotEnd = firstDeliveryTime
      } else if (i === sortedDeliveries.length) {
        // After last delivery - calculate from last delivery location
        const lastDelivery = sortedDeliveries[i - 1]
        fromLocation = {
          lat: lastDelivery.latitude || WAREHOUSE.lat,
          lng: lastDelivery.longitude || WAREHOUSE.lng
        }
        const lastDeliveryEnd = timeToMinutes(sortedDeliveries[i - 1].delivery_time_slot?.split('-')[1] || '10:00')
        slotStart = lastDeliveryEnd
        slotEnd = WORKING_DAY_END
      } else {
        // Between deliveries
        const prevDelivery = sortedDeliveries[i - 1]
        const nextDelivery = sortedDeliveries[i]

        fromLocation = {
          lat: prevDelivery.latitude || WAREHOUSE.lat,
          lng: prevDelivery.longitude || WAREHOUSE.lng
        }

        slotStart = timeToMinutes(prevDelivery.delivery_time_slot?.split('-')[1] || '10:00')
        slotEnd = timeToMinutes(nextDelivery.delivery_time_slot?.split('-')[0] || '14:00')
      }

      // Calculate travel time from previous location
      const distance = calculateDistance(
        fromLocation.lat,
        fromLocation.lng,
        newDeliveryLocation.lat,
        newDeliveryLocation.lng
      )
      const travelTime = estimateTravelTime(distance)

      // Adjust slot start to account for travel time and buffer
      const adjustedStart = (i === 0)
        ? Math.max(WORKING_DAY_START, currentTime) + travelTime + TIME_BUFFER
        : slotStart + travelTime + TIME_BUFFER

      // Generate slots in this window
      for (let time = adjustedStart; time <= slotEnd - DELIVERY_DURATION; time += TIME_SLOT_INTERVAL) {
        if (time >= WORKING_DAY_START && time <= WORKING_DAY_END - DELIVERY_DURATION) {
          const startTime = minutesToTime(time)
          const endTime = minutesToTime(time + DELIVERY_DURATION)
          availableSlots.push({
            time: startTime,
            label: `${startTime} - ${endTime}`,
            distance: distance.toFixed(1),
            travelTime: travelTime,
            afterDelivery: i > 0 ? sortedDeliveries[i - 1].id : null
          })
        }
      }

      currentTime = slotEnd
    }
  }

  // Remove duplicates and sort
  const uniqueSlots = Array.from(
    new Map(availableSlots.map(slot => [slot.time, slot])).values()
  )

  return uniqueSlots.sort((a, b) => a.time.localeCompare(b.time))
}

/**
 * Convert HH:MM to minutes since midnight
 */
function timeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Get a simple list of available time slots (without complex calculation)
 * Useful for quick manual booking
 */
export function getStandardTimeSlots() {
  const slots = []
  for (let time = WORKING_DAY_START; time <= WORKING_DAY_END - DELIVERY_DURATION; time += TIME_SLOT_INTERVAL) {
    const startTime = minutesToTime(time)
    const endTime = minutesToTime(time + DELIVERY_DURATION)
    slots.push({
      time: startTime,
      label: `${startTime} - ${endTime}`
    })
  }
  return slots
}

/**
 * Check if a specific time slot is available
 */
export function isTimeSlotAvailable(timeSlot, existingDeliveries) {
  const [newStart, newEnd] = timeSlot.split('-').map(t => timeToMinutes(t.trim()))

  return !existingDeliveries.some(delivery => {
    const [existingStart, existingEnd] = delivery.delivery_time_slot
      .split('-')
      .map(t => timeToMinutes(t.trim()))

    // Check for overlap
    return (newStart < existingEnd && newEnd > existingStart)
  })
}

/**
 * Get recommended time slot based on existing deliveries
 * Returns the optimal slot that minimizes total travel distance
 */
export async function getRecommendedTimeSlot(date, existingDeliveries, newDeliveryLocation) {
  const availableSlots = await calculateAvailableTimeSlots(date, existingDeliveries, newDeliveryLocation)

  if (availableSlots.length === 0) return null

  // Find slot with minimum travel time (most efficient)
  return availableSlots.reduce((best, current) =>
    current.travelTime < best.travelTime ? current : best
  )
}
