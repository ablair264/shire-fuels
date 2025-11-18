import React, { useState } from 'react'
import SplitText from './SplitText'

const Coverage = () => {
  const [postcode, setPostcode] = useState('')

  const handlePostcodeCheck = (e) => {
    e.preventDefault()
    console.log('Checking postcode:', postcode)
    // Handle postcode lookup
    alert(`Checking coverage for ${postcode}...`)
  }

  const serviceAreas = [
    "Worcester",
    "Hereford",
    "Gloucester",
    "Cheltenham",
    "Tenbury Wells",
    "Leominster",
    "Evesham",
    "Broadway",
    "Abergavenny",
    "Hay-On-Wye",
    "Forest of Dean"
  ]

  return (
    <section id="coverage" className="relative py-16">
      {/* Background Map Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2274&auto=format&fit=crop"
          alt="Map background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="bg-accent text-white p-8 lg:p-12 rounded-lg shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-start gap-3">
              <div>
                <SplitText text="DELIVERING" className="inline-block" delay={40} /><br /><SplitText text="WHERE OTHERS CAN'T" className="inline-block" delay={40} />
              </div>
              <img
                src="/images/logo/final-logo-white.svg"
                alt=""
                className="h-10 w-auto inline-block flex-shrink-0 mt-2"
                aria-hidden="true"
              />
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-bold text-lg">24/7 EMERGENCY DELIVERY*</h3>
                  <p className="text-white/90">Available any time of day or night</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-bold text-lg">SMALL OR LARGE QUANTITIES</h3>
                  <p className="text-white/90">Flexible delivery volumes to suit your needs</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">CHECK YOUR AREA</h3>
              <p className="mb-4 text-white/90">
                At Shire Fuels we're committed to providing the very best in customer service to a diverse customer base across the West Midlands. We are available to assist you 24 hours a day, 7 days a week.
              </p>
              <p className="mb-4 text-white/90">
                To check if we cover your area, please use the postcode finder below:
              </p>
              
              <form onSubmit={handlePostcodeCheck} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Start Typing Your Postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="input input-bordered flex-1 text-neutral"
                  required
                />
                <button type="submit" className="btn btn-primary text-white">
                  CHECK
                </button>
              </form>
            </div>

            <p className="text-sm text-white/70">
              *Our 24/7 emergency fuel delivery service is available to all customers. An additional call-out charge will apply for all out of hours deliveries.
            </p>
          </div>

          {/* Right Side - Service Areas */}
          <div className="bg-white p-8 lg:p-12 rounded-lg shadow-2xl">
            <h3 className="text-3xl font-bold text-accent mb-6">Serving Customers In</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {serviceAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-base-200 rounded-lg hover:bg-primary/10 transition-colors">
                  <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-accent">{area}</span>
                </div>
              ))}
            </div>

            <div className="bg-base-200 p-6 rounded-lg">
              <h4 className="font-bold text-accent mb-2">Forest of Dean Specialist</h4>
              <p className="text-neutral">
                Our 4x4 delivery service is specially designed for rural and difficult-to-reach locations throughout the Forest of Dean and surrounding areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Coverage
