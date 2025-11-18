import React, { useState } from 'react'
import { motion } from 'motion/react'

const Calendar = ({ deliveries = [], onDateClick, onDeliveryClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day)
      })
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day)
      })
    }

    return days
  }

  const getDeliveriesForDate = (date) => {
    const dateStr = formatDateForComparison(date)
    return deliveries.filter(delivery => {
      const deliveryDate = formatDateForComparison(new Date(delivery.delivery_date))
      return deliveryDate === dateStr
    })
  }

  const formatDateForComparison = (date) => {
    return date.toISOString().split('T')[0]
  }

  const isToday = (date) => {
    const today = new Date()
    return formatDateForComparison(date) === formatDateForComparison(today)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const calendarDays = getCalendarDays()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((dayInfo, index) => {
          const dayDeliveries = getDeliveriesForDate(dayInfo.date)
          const hasDeliveries = dayDeliveries.length > 0
          const isTodayDate = isToday(dayInfo.date)

          return (
            <motion.button
              key={index}
              onClick={() => onDateClick(dayInfo.date)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                min-h-[100px] p-2 rounded-xl border-2 transition-all relative
                ${dayInfo.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                ${isTodayDate ? 'border-[#2a4f8e] ring-2 ring-[#2a4f8e]/20' : 'border-gray-100'}
                ${hasDeliveries ? 'hover:border-blue-300' : 'hover:border-gray-300'}
              `}
            >
              {/* Day number */}
              <div className="flex justify-between items-start mb-1">
                <span className={`
                  text-sm font-semibold
                  ${!dayInfo.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                  ${isTodayDate ? 'text-[#2a4f8e]' : ''}
                `}>
                  {dayInfo.day}
                </span>
                {hasDeliveries && (
                  <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {dayDeliveries.length}
                  </span>
                )}
              </div>

              {/* Deliveries */}
              {hasDeliveries && (
                <div className="space-y-1">
                  {dayDeliveries.slice(0, 3).map((delivery, idx) => {
                    const statusColors = {
                      'scheduled': 'bg-blue-100 text-blue-700',
                      'in-progress': 'bg-yellow-100 text-yellow-700',
                      'completed': 'bg-green-100 text-green-700',
                      'cancelled': 'bg-red-100 text-red-700'
                    }

                    return (
                      <div
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeliveryClick?.(delivery)
                        }}
                        className={`
                          text-xs px-2 py-1 rounded truncate text-left
                          ${statusColors[delivery.status] || 'bg-gray-100 text-gray-700'}
                        `}
                      >
                        {delivery.delivery_time_slot?.split('-')[0] || 'TBD'} - {delivery.customer_name || 'Customer'}
                      </div>
                    )
                  })}
                  {dayDeliveries.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayDeliveries.length - 3} more
                    </div>
                  )}
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 rounded"></div>
          <span className="text-sm text-gray-600">Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 rounded"></div>
          <span className="text-sm text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 rounded"></div>
          <span className="text-sm text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  )
}

export default Calendar
