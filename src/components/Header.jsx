import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar container mx-auto px-4">
        {/* Logo (Element 2: Company Logo) */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/" className="text-accent font-medium">HOME</Link></li>
              <li><Link to="/fuel-cards" className="text-accent font-medium">FUEL CARDS</Link></li>
              <li><Link to="/oils-lubricants" className="text-accent font-medium">OILS & LUBRICANTS</Link></li>
              <li><a href="/#services" className="text-accent font-medium">SERVICES</a></li>
              <li><a href="/#coverage" className="text-accent font-medium">COVERAGE</a></li>
              <li><a href="/#testimonials" className="text-accent font-medium">REVIEWS</a></li>
              <li><a href="/#faq" className="text-accent font-medium">FAQ</a></li>
              <li><a href="/#contact" className="text-accent font-medium">CONTACT</a></li>
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              {/* Logo icon - simplified fuel drop design */}
              <svg viewBox="0 0 40 40" className="w-full h-full">
                {/* Green leaf/flame on left */}
                <path d="M15 10 Q10 20 15 30 Q18 25 15 20 Q12 15 15 10 Z" fill="#4D973C" />
                {/* Light blue droplet on right */}
                <path d="M25 10 Q30 20 25 30 Q22 25 25 20 Q28 15 25 10 Z" fill="#3082B4" />
                {/* Dark blue center accent */}
                <circle cx="20" cy="20" r="4" fill="#264B8C" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-secondary">SHIREFUELS</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li><Link to="/" className="text-accent font-medium hover:text-primary">HOME</Link></li>
            <li><Link to="/fuel-cards" className="text-accent font-medium hover:text-primary text-sm">FUEL CARDS</Link></li>
            <li><Link to="/oils-lubricants" className="text-accent font-medium hover:text-primary text-sm">OILS</Link></li>
            <li><a href="/#services" className="text-accent font-medium hover:text-primary text-sm">SERVICES</a></li>
            <li><a href="/#coverage" className="text-accent font-medium hover:text-primary text-sm">COVERAGE</a></li>
            <li><a href="/#testimonials" className="text-accent font-medium hover:text-primary text-sm">REVIEWS</a></li>
            <li><a href="/#faq" className="text-accent font-medium hover:text-primary">FAQ</a></li>
            <li><a href="/#contact" className="text-accent font-medium hover:text-primary text-sm">CONTACT</a></li>
          </ul>
        </div>

        {/* 24/7 Badge */}
        <div className="navbar-end">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-secondary">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-secondary flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-4 border-primary flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-secondary font-bold text-xs leading-none">24/7</div>
                    <div className="text-[8px] text-accent leading-none mt-0.5">EMERGENCY</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-secondary">EMERGENCY</div>
              <div className="text-xs text-accent">DELIVERY</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
