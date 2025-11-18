import React from 'react'

const Card = ({ children, className = '', hover = false, padding = 'p-6' }) => {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100
        transition-all duration-300
        ${hover ? 'hover:shadow-lg hover:-translate-y-0.5' : ''}
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card
