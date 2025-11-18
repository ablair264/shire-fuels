import React from 'react'
import SplitText from './SplitText'

const Emergency = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Emergency Badge */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer decorative circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border-8 border-secondary opacity-20 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border-8 border-primary opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Main badge */}
              <div className="relative w-64 h-64 rounded-full border-12 border-secondary flex items-center justify-center bg-white shadow-2xl">
                <div className="w-56 h-56 rounded-full border-12 border-primary flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-secondary mb-2">24/7</div>
                    <div className="text-2xl font-bold text-primary">EMERGENCY</div>
                    <div className="text-xl font-bold text-accent">DELIVERY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6 flex items-center gap-3">
              <SplitText text="Run out of fuel?..." className="inline-block" delay={40} />
              <img
                src="/images/logo/final-logo-blue.svg"
                alt=""
                className="h-10 w-auto inline-block"
                aria-hidden="true"
              />
            </h2>
            
            <p className="text-lg text-neutral mb-6">
              Mistakes happen... Whether you've run out of fuel on a bank holiday evening or a Sunday morning, we can deliver your fuel to you any time of the day or night! Find out more about our Emergency Delivery service below.
            </p>

            <div className="bg-base-200 p-6 rounded-lg mb-6">
              <p className="text-sm text-neutral italic">
                *Our 24/7 emergency fuel delivery service is available to all customers. An additional call-out charge will apply for all out of hours deliveries.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-bold text-accent">Bank Holidays</h4>
                  <p className="text-neutral">No problem - we deliver on all bank holidays</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-bold text-accent">Weekends</h4>
                  <p className="text-neutral">Saturday and Sunday delivery available</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-bold text-accent">Night Time</h4>
                  <p className="text-neutral">Late night and early morning deliveries</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-lg text-white px-8">
              READ MORE
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Emergency
