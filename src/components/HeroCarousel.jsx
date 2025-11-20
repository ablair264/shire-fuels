import React, { useState, useEffect, useCallback } from 'react'

const HeroCarousel = ({ slides, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextIndex, setNextIndex] = useState(null)

  const goToNext = useCallback(() => {
    setNextIndex((currentIndex + 1) % slides.length)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
      setIsTransitioning(false)
      setNextIndex(null)
    }, 800)
  }, [slides.length, currentIndex])

  const goToPrevious = () => {
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length
    setNextIndex(prevIdx)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(prevIdx)
      setIsTransitioning(false)
      setNextIndex(null)
    }, 800)
  }

  const goToSlide = (index) => {
    if (index === currentIndex) return
    setNextIndex(index)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
      setNextIndex(null)
    }, 800)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isTransitioning) return

    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, autoPlayInterval, goToNext, isTransitioning])

  // Preload next video for faster transitions
  useEffect(() => {
    const nextSlideIndex = (currentIndex + 1) % slides.length
    const nextSlideData = slides[nextSlideIndex]

    if (nextSlideData.type === 'video') {
      const video = document.createElement('video')
      video.src = nextSlideData.src
      video.preload = 'auto'
      video.load()
    }
  }, [currentIndex, slides])

  const currentSlide = slides[currentIndex]
  const nextSlide = nextIndex !== null ? slides[nextIndex] : null

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Render all slides but only show current/next for smooth transitions */}
      {slides.map((slide, index) => {
        const isCurrent = index === currentIndex
        const isNext = index === nextIndex
        const shouldShow = isCurrent || isNext

        if (!shouldShow) return null

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isCurrent && !isTransitioning ? 'opacity-100 z-10' :
              isNext && isTransitioning ? 'opacity-100 z-20' :
              'opacity-0 z-0'
            }`}
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={slide.alt || 'Hero slide'}
                className="w-full h-full object-cover"
                style={{ minWidth: '100%', minHeight: '100%' }}
              />
            ) : (
              <video
                src={slide.src}
                className="w-full h-full object-cover"
                style={{ minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            )}
          </div>
        )
      })}

      {/* Enhanced Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 pointer-events-none z-30"></div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-200 rounded-full disabled:cursor-not-allowed ${
              index === currentIndex
                ? 'w-8 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-4 z-40 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
        aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default HeroCarousel
