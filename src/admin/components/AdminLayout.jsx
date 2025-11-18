import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-24' : 'ml-72'
        } p-8`}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
