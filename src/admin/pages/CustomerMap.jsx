import React, { useState, useEffect, useRef } from 'react'
import PageHeader from '../shared/PageHeader'
import Card from '../shared/Card'
import { postcodeToCoordinates } from '../utils/timeSlotCalculator'

const CustomerMap = () => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [filterType, setFilterType] = useState('all')

  // Mock customers - replace with Supabase query
  const [customers] = useState([
    {
      id: '1',
      name: 'John Smith',
      postcode: 'GL16 8BE',
      address_line1: '123 High Street',
      city: 'Coleford',
      phone: '01594 123456',
      customer_type: 'residential'
    },
    {
      id: '2',
      name: 'Green Valley Farm',
      postcode: 'GL15 6HN',
      address_line1: 'Green Valley Road',
      city: 'Lydney',
      phone: '01594 789012',
      customer_type: 'farm'
    },
    {
      id: '3',
      name: 'Brown & Co',
      postcode: 'GL16 7JK',
      address_line1: '45 Industrial Estate',
      city: 'Cinderford',
      phone: '01594 345678',
      customer_type: 'commercial'
    },
    {
      id: '4',
      name: 'Emma Wilson',
      postcode: 'GL14 2AB',
      address_line1: '78 Farm Lane',
      city: 'Newnham',
      phone: '01594 901234',
      customer_type: 'residential'
    },
    {
      id: '5',
      name: 'David Taylor',
      postcode: 'GL17 0CD',
      address_line1: 'Oak Tree Cottage',
      city: 'Mitcheldean',
      phone: '01594 567890',
      customer_type: 'residential'
    }
  ])

  const filteredCustomers = filterType === 'all'
    ? customers
    : customers.filter(c => c.customer_type === filterType)

  const getMarkerColor = (type) => {
    const colors = {
      'residential': '#3b82f6', // blue
      'farm': '#22c55e', // green
      'commercial': '#a855f7' // purple
    }
    return colors[type] || '#6b7280'
  }

  useEffect(() => {
    // Load Google Maps Script
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true)
        return
      }

      const script = document.createElement('script')
      // TODO: Replace with your Google Maps API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setMapLoaded(true)
      script.onerror = () => {
        console.error('Failed to load Google Maps')
        // Fallback: Show message to add API key
      }
      document.head.appendChild(script)
    }

    loadGoogleMaps()
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    // Initialize map centered on Gloucestershire
    const initMap = async () => {
      const { Map } = await window.google.maps.importLibrary("maps")
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker")

      const map = new Map(mapRef.current, {
        center: { lat: 51.7733, lng: -2.5014 }, // Coleford, Gloucestershire
        zoom: 11,
        mapId: 'SHIRE_FUELS_MAP', // Required for advanced markers
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      })

      mapInstanceRef.current = map

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []

      // Add customer markers
      for (const customer of filteredCustomers) {
        try {
          const coords = await postcodeToCoordinates(customer.postcode)

          // Create custom marker element
          const markerElement = document.createElement('div')
          markerElement.className = 'custom-marker'
          markerElement.innerHTML = `
            <div class="relative">
              <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform transition-transform hover:scale-110"
                   style="background-color: ${getMarkerColor(customer.customer_type)}">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                   style="background-color: ${getMarkerColor(customer.customer_type)}"></div>
            </div>
          `

          const marker = new AdvancedMarkerElement({
            map,
            position: coords,
            content: markerElement,
            title: customer.name
          })

          // Add click listener
          markerElement.addEventListener('click', () => {
            setSelectedCustomer(customer)
            map.setCenter(coords)
            map.setZoom(14)
          })

          markersRef.current.push(marker)
        } catch (error) {
          console.error(`Failed to geocode ${customer.postcode}:`, error)
        }
      }

      // Fit bounds to show all markers
      if (markersRef.current.length > 0) {
        const bounds = new window.google.maps.LatLngBounds()
        for (const marker of markersRef.current) {
          bounds.extend(marker.position)
        }
        map.fitBounds(bounds)
      }
    }

    initMap()
  }, [mapLoaded, filteredCustomers])

  const stats = {
    total: customers.length,
    residential: customers.filter(c => c.customer_type === 'residential').length,
    farm: customers.filter(c => c.customer_type === 'farm').length,
    commercial: customers.filter(c => c.customer_type === 'commercial').length
  }

  return (
    <div>
      <PageHeader
        title="Customer Map"
        subtitle="View all customer locations on an interactive map"
      />

      {/* Stats & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'All Customers', value: stats.total, key: 'all', color: 'gray' },
          { label: 'Residential', value: stats.residential, key: 'residential', color: 'blue' },
          { label: 'Farm', value: stats.farm, key: 'farm', color: 'green' },
          { label: 'Commercial', value: stats.commercial, key: 'commercial', color: 'purple' }
        ].map((stat) => (
          <Card
            key={stat.key}
            hover
            className={`cursor-pointer ${filterType === stat.key ? 'ring-2 ring-[#2a4f8e]' : ''}`}
            onClick={() => setFilterType(stat.key)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-3 h-3 rounded-full bg-${stat.color}-500`}></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card padding="p-0" className="overflow-hidden">
            {!mapLoaded ? (
              <div className="h-[600px] flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#2a4f8e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading map...</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Note: Add your Google Maps API key to enable the map
                  </p>
                </div>
              </div>
            ) : (
              <div ref={mapRef} className="h-[600px] w-full"></div>
            )}
          </Card>
        </div>

        {/* Customer Details Sidebar */}
        <div>
          <Card>
            {selectedCustomer ? (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{selectedCustomer.name}</h3>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      selectedCustomer.customer_type === 'residential' ? 'bg-blue-100 text-blue-700' :
                      selectedCustomer.customer_type === 'farm' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedCustomer.customer_type}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">{selectedCustomer.address_line1}</p>
                    <p className="text-gray-900">{selectedCustomer.city}</p>
                    <p className="font-semibold text-gray-900">{selectedCustomer.postcode}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{selectedCustomer.phone}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button className="w-full px-4 py-2 bg-[#2a4f8e] text-white rounded-lg hover:bg-[#1e3a6b] transition-colors font-semibold text-sm">
                      View Full Details
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm">
                      Book Delivery
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 font-medium">Select a customer</p>
                <p className="text-sm text-gray-500 mt-1">Click on a marker to view details</p>
              </div>
            )}
          </Card>

          {/* Legend */}
          <Card className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Residential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Farm</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-600">Commercial</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CustomerMap
