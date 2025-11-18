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
              <li><Link to="/oil-tanks" className="text-accent font-medium">OIL TANKS</Link></li>
              <li><a href="/#coverage" className="text-accent font-medium">COVERAGE</a></li>
              <li><a href="/#testimonials" className="text-accent font-medium">REVIEWS</a></li>
              <li><a href="/#faq" className="text-accent font-medium">FAQ</a></li>
              <li><a href="/#contact" className="text-accent font-medium">CONTACT</a></li>
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo/final-logo.png"
              alt="Shire Fuels Logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li><Link to="/" className="text-accent font-medium hover:text-primary">HOME</Link></li>
            <li><Link to="/fuel-cards" className="text-accent font-medium hover:text-primary text-sm">FUEL CARDS</Link></li>
            <li><Link to="/oils-lubricants" className="text-accent font-medium hover:text-primary text-sm">OILS</Link></li>
            <li><Link to="/oil-tanks" className="text-accent font-medium hover:text-primary text-sm">TANKS</Link></li>
            <li><a href="/#coverage" className="text-accent font-medium hover:text-primary text-sm">COVERAGE</a></li>
            <li><a href="/#testimonials" className="text-accent font-medium hover:text-primary text-sm">REVIEWS</a></li>
            <li><a href="/#faq" className="text-accent font-medium hover:text-primary">FAQ</a></li>
            <li><a href="/#contact" className="text-accent font-medium hover:text-primary text-sm">CONTACT</a></li>
          </ul>
        </div>

        {/* Admin Login Link */}
        <div className="navbar-end">
          <Link
            to="/admin/login"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white hover:bg-primary transition-colors font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Admin Login</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
