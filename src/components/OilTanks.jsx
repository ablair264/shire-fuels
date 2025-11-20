import React, { useState, useEffect } from 'react'
import SplitText from './SplitText'
import FadeContent from './FadeContent'
import { supabase } from '../lib/supabase'
import BookDeliveryModal from './BookDeliveryModal'
import EnquiryConfirmationModal from './EnquiryConfirmationModal'

const OilTanks = () => {
  const [tanks, setTanks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  // Fetch active tanks from Supabase on component mount
  useEffect(() => {
    fetchTanks()
  }, [])

  const fetchTanks = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('oil_tank_products')
        .select('*')
        .eq('is_active', true)  // Only show active tanks to public
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('name')

      if (error) throw error
      setTanks(data || [])
    } catch (err) {
      console.error('Error fetching tanks:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        {/* Background with company colors */}
        <div className="absolute inset-0 z-0">
          {/* Background Image - replace src with your image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/tanker-7.jpg')`,
            }}
          />
          {/* Overlay with company colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/80 via-secondary/70 to-accent/60"></div>
        </div>

        {/* Wave divider at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-br from-transparent via-accent/20 to-accent z-10"></div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <SplitText text="OIL TANKS" className="inline-block" delay={50} />
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-4 font-medium">
              Quality storage solutions for your heating oil needs
            </p>
            <p className="text-lg text-white/90 mb-8 max-w-3xl">
              We provide a variety of oil tanks for purchase. All our tanks are bunded for safety and comply with current regulations. If you'd like further information on any of the items below, get in touch.
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
              <a
                href="tel:01594738139"
                className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-accent text-lg px-8"
              >
                CALL 01594 738139
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Range Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent flex items-center justify-center gap-3">
              <SplitText text="OUR TANK RANGE" className="inline-block" delay={40} />
              <img
                src="/images/logo/final-logo-blue.svg"
                alt=""
                className="h-10 w-auto inline-block"
                aria-hidden="true"
              />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our selection of high-quality bunded oil tanks, designed for safety, durability, and compliance with regulations
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              <p className="mt-4 text-gray-600">Loading our tank range...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              <p className="font-semibold">Unable to load tanks</p>
              <p className="text-sm mt-1">{error}</p>
              <p className="text-sm mt-2">Please contact us at 01594 738139 for tank information.</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && tanks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No tanks available at the moment. Please contact us for more information.</p>
            </div>
          )}

          {/* Tanks Grid */}
          {!loading && !error && tanks.length > 0 && (
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {tanks.map((tank, index) => (
              <FadeContent key={index} direction="up" delay={index * 100}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-accent/30">
                  {/* Image Placeholder */}
                  <div className="relative h-80 bg-gradient-to-br from-accent to-secondary overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <svg className="w-24 h-24 mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div className="text-white/80 text-sm font-medium">Image Placeholder</div>
                      <div className="text-white/60 text-xs mt-1">1000x800</div>
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-accent mb-1">{tank.name}</h3>
                      <p className="text-secondary font-semibold">{tank.model}</p>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-gray-700"><strong>Volume:</strong> {tank.volume}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                        <span className="text-gray-700"><strong>Weight:</strong> {tank.weight}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <div className="text-gray-700">
                          <strong>Dimensions:</strong>
                          <div className="text-sm mt-1 space-y-0.5">
                            {tank.dimensions.length && <div>L: {tank.dimensions.length}</div>}
                            {tank.dimensions.width && <div>W: {tank.dimensions.width}</div>}
                            {tank.dimensions.height && <div>H: {tank.dimensions.height}</div>}
                            {tank.dimensions.diameter && <div>Ø: {tank.dimensions.diameter}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="text-gray-700"><strong>Footprint:</strong> {tank.footprint}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-bold text-accent mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {tank.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="btn btn-primary flex-1 text-white"
                      >
                        Get Quote
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="btn btn-outline btn-accent flex-1">
                        More Info
                      </button>
                    </div>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent flex items-center justify-center gap-3">
              <SplitText text="WHY CHOOSE SHIRE FUELS TANKS" className="inline-block" delay={40} />
              <img
                src="/images/logo/final-logo-blue.svg"
                alt=""
                className="h-10 w-auto inline-block"
                aria-hidden="true"
              />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quality, safety, and compliance guaranteed with every installation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FadeContent direction="up" delay={0}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent">Fully Bunded</h3>
                <p className="text-gray-700">All tanks feature double-wall construction for maximum environmental protection and peace of mind</p>
              </div>
            </FadeContent>

            <FadeContent direction="up" delay={100}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent">OFTEC Approved</h3>
                <p className="text-gray-700">Compliant with all current building regulations and industry standards for safe installation</p>
              </div>
            </FadeContent>

            <FadeContent direction="up" delay={200}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent">Expert Installation</h3>
                <p className="text-gray-700">Professional installation service available with all tank purchases for complete peace of mind</p>
              </div>
            </FadeContent>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeContent direction="up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
              <SplitText text="Need Help Choosing the Right Tank?" className="inline-block" delay={30} />
              <img
                src="/images/logo/final-logo-white.svg"
                alt=""
                className="h-10 w-auto inline-block"
                aria-hidden="true"
              />
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our expert team can help you select the perfect oil tank for your needs and arrange professional installation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="btn btn-lg bg-white text-accent hover:bg-white/90 border-none text-lg px-8"
              >
                REQUEST A QUOTE
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <a
                href="tel:01594738139"
                className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-accent text-lg px-8"
              >
                CALL 01594 738139
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </FadeContent>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-bold text-lg">Fully Bunded</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-bold text-lg">OFTEC Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="font-bold text-lg">Expert Installation</span>
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

export default OilTanks
