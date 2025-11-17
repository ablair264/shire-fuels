import React from 'react'

const Footer = () => {
  return (
    <footer id="contact" className="bg-neutral text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <path d="M15 10 Q10 20 15 30 Q18 25 15 20 Q12 15 15 10 Z" fill="#4D973C" />
                  <path d="M25 10 Q30 20 25 30 Q22 25 25 20 Q28 15 25 10 Z" fill="#3082B4" />
                  <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="text-xl font-bold text-secondary">SHIREFUELS</span>
            </div>
            <p className="text-white/80 mb-4">
              Delivering Where Others Can't. Family-run fuel supplier serving Gloucestershire and the West Midlands since 2013.
            </p>
            <div className="flex gap-3">
              <a href="#" className="btn btn-circle btn-sm bg-white/10 border-white/20 hover:bg-primary hover:border-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="btn btn-circle btn-sm bg-white/10 border-white/20 hover:bg-primary hover:border-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white/80 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="text-white/80 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#coverage" className="text-white/80 hover:text-primary transition-colors">Coverage Area</a></li>
              <li><a href="#testimonials" className="text-white/80 hover:text-primary transition-colors">Reviews</a></li>
              <li><a href="#faq" className="text-white/80 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Heating Oil</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Red Diesel</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Fuel Cards</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Oil Tanks</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Oils & Lubricants</a></li>
              <li><a href="#" className="text-white/80 hover:text-primary transition-colors">AdBlue</a></li>
            </ul>
          </div>

          {/* Contact Info (Element 11: Contact Information) */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-white/80">
                  <div>Unit 20 Foxes Bridge Road</div>
                  <div>Forest Vale Industrial Estate</div>
                  <div>Cinderford, GL14 2PQ</div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:01594738139" className="text-white/80 hover:text-primary transition-colors">01594 738139</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@shirefuels.co.uk" className="text-white/80 hover:text-primary transition-colors">info@shirefuels.co.uk</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Legal Links */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Shire Fuels. All rights reserved.
            </p>
            
            {/* Element 11: Legal Pages */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Cookie Policy</a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
