import React from 'react'
import { motion } from 'motion/react'
import Card from '../shared/Card'

const MetricCard = ({ title, value, icon, color = 'blue', trend, delay = 0 }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      text: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: {
      bg: 'bg-green-500',
      lightBg: 'bg-green-50',
      text: 'text-green-600',
      gradient: 'from-green-500 to-green-600'
    },
    purple: {
      bg: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      text: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600'
    },
    orange: {
      bg: 'bg-orange-500',
      lightBg: 'bg-orange-50',
      text: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-600'
    }
  }

  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card hover className="relative overflow-hidden">
        {/* Background gradient decoration */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-full -mr-16 -mt-16`} />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <motion.h3
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
              className="text-4xl font-bold text-gray-900"
            >
              {value}
            </motion.h3>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <svg
                  className={`w-4 h-4 ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={trend.direction === 'up' ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'}
                  />
                </svg>
                <span className={`text-sm font-medium ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.value}
                </span>
                <span className="text-sm text-gray-500">{trend.label}</span>
              </div>
            )}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.1, type: 'spring' }}
            className={`w-14 h-14 ${colors.lightBg} rounded-2xl flex items-center justify-center ${colors.text}`}
          >
            {icon}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default MetricCard
