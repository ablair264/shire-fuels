import React from 'react'

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
        {subtitle && (
          <p className="text-gray-600">{subtitle}</p>
        )}
      </div>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  )
}

export default PageHeader
