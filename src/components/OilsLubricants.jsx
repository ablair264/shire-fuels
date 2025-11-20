import React, { useState } from 'react'
import SplitText from './SplitText'
import FadeContent from './FadeContent'
import AnimatedList from './AnimatedList'
import BookDeliveryModal from './BookDeliveryModal'
import EnquiryConfirmationModal from './EnquiryConfirmationModal'

const OilsLubricants = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const products = [
    {
      name: "Engine Oils",
      image: "/images/engine-oil.jpg",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      description: "Premium quality engine oils for petrol and diesel engines. Full range of viscosities including 5W-30, 10W-40, and more.",
      applications: ["Cars", "Vans", "HGVs", "Agricultural machinery"]
    },
    {
      name: "Hydraulic Oils",
      image: "/images/gold-oil.jpg",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "High-performance hydraulic oils for industrial and agricultural applications. Excellent anti-wear protection.",
      applications: ["Hydraulic systems", "Lifting equipment", "Agricultural machinery", "Industrial equipment"]
    },
    {
      name: "Chainsaw Oils",
      image: "/images/yellow-oil.jpg",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      description: "Specially formulated chainsaw bar and chain oils with tackifiers to reduce fling-off and provide superior lubrication.",
      applications: ["Chainsaws", "Tree surgery", "Forestry work", "Landscaping"]
    },
    {
      name: "Gear Oils",
      image: "/images/thick-oil-1.jpg",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description: "Superior gear oils providing extreme pressure protection. Available in various grades for different applications.",
      applications: ["Gearboxes", "Differentials", "Final drives", "Industrial gearboxes"]
    },
    {
      name: "Transmission Oils",
      image: "/images/gold-oil-2.jpg",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      description: "Automatic and manual transmission fluids meeting major manufacturer specifications for smooth gear changes.",
      applications: ["Automatic transmissions", "Manual gearboxes", "CVT systems", "Power steering"]
    },
    {
      name: "Cutting Oils",
      image: "/images/water-oil.jpg",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      ),
      description: "High-quality cutting and machining oils for metalworking operations. Excellent cooling and lubrication properties.",
      applications: ["CNC machining", "Metal cutting", "Drilling", "Threading operations"]
    },
    {
      name: "Grease",
      image: "/images/green-oil.png",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      description: "Multi-purpose and specialist greases for bearings, chassis, and industrial applications. Water-resistant formulations.",
      applications: ["Bearings", "Chassis lubrication", "Agricultural equipment", "Marine applications"]
    },
    {
      name: "Coolants",
      image: "/images/water-oil-2.jpg",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      description: "Engine coolants and antifreeze providing year-round protection. Long-life formulations for extended service intervals.",
      applications: ["Car engines", "Van engines", "HGV cooling systems", "Stationary engines"]
    },
    {
      name: "AdBlue",
      image: "/images/car-oil.jpg",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      description: "High-purity AdBlue diesel exhaust fluid meeting ISO 22241 standards. Reduces harmful NOx emissions.",
      applications: ["Modern diesel vehicles", "HGVs", "Commercial vehicles", "Agricultural machinery"]
    }
  ]

  const sizes = [
    {
      size: "1 Litre",
      ideal: "Perfect for personal use and small jobs",
      icon: "📦"
    },
    {
      size: "5 Litres",
      ideal: "Great for regular maintenance and top-ups",
      icon: "🛢️"
    },
    {
      size: "20 Litres",
      ideal: "Ideal for workshops and small businesses",
      icon: "🪣"
    },
    {
      size: "60 Litre Barrels",
      ideal: "Cost-effective for regular commercial use",
      icon: "🛢️"
    },
    {
      size: "205 Litre Barrels",
      ideal: "Best value for high-volume users",
      icon: "🛢️"
    },
    {
      size: "1,000 Litre IBCs",
      ideal: "Bulk supply for industrial operations",
      icon: "🏭"
    }
  ]

  const benefits = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Premium Quality",
      description: "All our oils and lubricants meet or exceed industry specifications and manufacturer requirements"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Competitive Pricing",
      description: "We offer excellent value for money with bulk discounts available on larger orders"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: "Wide Range",
      description: "Comprehensive stock of oils, lubricants and fluids for all applications and industries"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Expert Advice",
      description: "Our knowledgeable team can help you choose the right product for your specific needs"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        {/* Background with company colors */}
        <div className="absolute inset-0 z-0">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/tanker-back.jpg')`,
            }}
          />
          {/* Overlay with company colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-accent/70 to-secondary/60"></div>
        </div>

        {/* Wave divider at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-br from-transparent via-accent/20 to-accent z-10"></div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <SplitText text="OILS & LUBRICANTS" className="inline-block" delay={50} />
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-4 font-medium">
              Not just the amazing little oil company delivering Kerosene
            </p>
            <p className="text-lg text-white/90 mb-8 max-w-3xl">
              Throughout The Forest of Dean and surrounding areas, we now stock a comprehensive range of oils, lubricants and AdBlue for all your automotive, agricultural, and industrial needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="btn btn-primary btn-lg text-white text-lg px-8"
              >
                REQUEST A QUOTE
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-accent text-lg px-8">
                CALL 01594 738139
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4 flex items-center justify-center gap-3">
              <SplitText text="OUR PRODUCT RANGE" className="inline-block" delay={40} />
              <img
                src="/images/logo/final-logo-blue.svg"
                alt=""
                className="h-10 w-auto inline-block"
                aria-hidden="true"
              />
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive selection of premium oils and lubricants for every application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-accent mb-3">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-bold text-sm text-secondary mb-2">Applications:</h4>
                    <ul className="space-y-1">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sizes Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              AVAILABLE SIZES
              <img
                src="/images/logo/final-logo-white.svg"
                alt=""
                className="h-10 w-auto inline-block"
                aria-hidden="true"
              />
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              From 1 litre containers to 1,000 litre IBCs - we have the right size for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sizes.map((size, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
                <div className="text-4xl mb-3">{size.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{size.size}</h3>
                <p className="text-white/90">{size.ideal}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Custom Volumes Available</h3>
            <p className="text-lg text-white/90">
              Need a specific quantity? We can accommodate custom orders to suit your exact requirements.
              Contact our team to discuss your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4 flex items-center justify-center gap-3">
              WHY CHOOSE SHIRE FUELS?
              <img
                src="/images/logo/final-logo-blue.svg"
                alt=""
                className="h-10 w-auto inline-block"
                aria-hidden="true"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-secondary mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-accent mb-3">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">INDUSTRIES WE SERVE</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Trusted by professionals across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Automotive", icon: "🚗" },
              { name: "Agriculture", icon: "🚜" },
              { name: "Construction", icon: "🏗️" },
              { name: "Forestry", icon: "🌲" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Transport", icon: "🚛" },
              { name: "Marine", icon: "⚓" },
              { name: "Engineering", icon: "⚙️" }
            ].map((industry, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-bold text-accent">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In Touch Today To See How Much We Can Save You
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help you find the perfect oils and lubricants for your needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="btn btn-lg bg-white text-accent hover:bg-white/90 border-none text-lg px-8"
            >
              REQUEST A QUOTE
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-accent text-lg px-8">
              CALL 01594 738139
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-bold text-lg">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="font-bold text-lg">Wide Range</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold text-lg">Competitive Prices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookDeliveryModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={() => setIsConfirmationModalOpen(true)}
      />

      {/* Confirmation Modal */}
      <EnquiryConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
      />
    </div>
  )
}

export default OilsLubricants
