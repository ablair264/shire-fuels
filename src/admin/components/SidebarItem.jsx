import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

const SidebarItem = ({ item, isCollapsed }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const isActive = location.pathname === item.path ||
    (hasChildren && item.children.some(child => location.pathname === child.path))

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  const ItemContent = () => (
    <>
      <div className="flex items-center gap-3 flex-1">
        <div className="w-5 h-5 flex items-center justify-center">
          {item.icon}
        </div>
        {!isCollapsed && (
          <span className="font-medium">{item.label}</span>
        )}
      </div>
      {!isCollapsed && hasChildren && (
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      )}
    </>
  )

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={handleClick}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-xl
            transition-all duration-200 text-white
            ${isActive ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <ItemContent />
        </button>
      ) : (
        <Link
          to={item.path}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-xl
            transition-all duration-200 text-white
            ${isActive ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <ItemContent />
        </Link>
      )}

      {/* Accordion children */}
      {!isCollapsed && hasChildren && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden ml-4 mt-1 space-y-1"
            >
              {item.children.map((child, index) => (
                <Link
                  key={index}
                  to={child.path}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-lg
                    transition-all duration-200 text-white/90 text-sm
                    ${location.pathname === child.path
                      ? 'bg-white/15 text-white font-medium'
                      : 'hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default SidebarItem
