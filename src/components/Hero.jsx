import React, { useState } from 'react'
import SplitText from './SplitText'
import HeroCarousel from './HeroCarousel'
import BookDeliveryModal from './BookDeliveryModal'
import EnquiryConfirmationModal from './EnquiryConfirmationModal'

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  // Define carousel slides with images and videos
  const carouselSlides = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop',
      alt: 'Rural countryside aerial view'
    },
    {
      type: 'video',
      src: '/images/Fuel_Tanker_Video_Generation (1).mp4',
      alt: 'Fuel tanker delivery video'
    },
    {
      type: 'video',
      src: '/images/Fuel_Tanker_Video_Generation (2).mp4',
      alt: 'Fuel tanker in action'
    },
    {
      type: 'image',
      src: '/images/tanker-full.jpg',
      alt: 'Fuel tanker truck'
    }
  ]

  return (
    <section id="home" className="relative min-h-[600px] flex items-center">
      {/* Hero Background Carousel */}
      <HeroCarousel slides={carouselSlides} autoPlayInterval={6000} />

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-br from-transparent via-accent/20 to-accent"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl">
          {/* Element 3: SEO-Optimized Title and Subtitle */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <SplitText text="Delivering Where" className="inline-block" delay={50} /> <br /><SplitText text="Others Can't" className="inline-block" delay={50} />
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-4 font-medium">
            From households to rural farms and commercial premises we're here to keep you supplied.
          </p>
          <p className="text-lg text-white/90 mb-8 max-w-xl">
            Family-run fuel supplier with 10+ years experience. We specialize in 4x4 deliveries to reach difficult locations others can't access.
          </p>

          {/* Element 4: Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="btn btn-primary btn-lg text-white text-lg px-8"
            >
              BOOK FUEL DELIVERY
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

          {/* Element 5: Social Proof */}
          <div className="flex items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="flex text-warning">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-accent font-bold">4.9/5</span>
            </div>

            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-accent font-bold">500+ Happy Customers</span>
            </div>

            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-accent font-bold">10+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  )
}

export default Hero
