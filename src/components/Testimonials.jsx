import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Gloucester",
      rating: 5,
      text: "Excellent service! They delivered to our remote farm location when other suppliers said it was impossible. The 4x4 delivery really makes a difference.",
      date: "2 weeks ago"
    },
    {
      name: "Michael Davies",
      location: "Forest of Dean",
      rating: 5,
      text: "Quick response and competitive pricing. Used them for emergency heating oil delivery on a Sunday and they were there within 3 hours. Highly recommend!",
      date: "1 month ago"
    },
    {
      name: "Emma Wilson",
      location: "Cheltenham",
      rating: 5,
      text: "Family-run business that really cares about their customers. Always helpful and reliable. We've been using them for over 5 years now.",
      date: "2 months ago"
    },
    {
      name: "David Richards",
      location: "Hereford",
      rating: 5,
      text: "Best fuel supplier in the area. Fair prices, prompt delivery, and they always go the extra mile. The staff are friendly and professional.",
      date: "3 weeks ago"
    },
    {
      name: "Lisa Thompson",
      location: "Worcester",
      rating: 5,
      text: "Saved us during the cold snap last winter. Emergency delivery arrived quickly and the driver was very helpful. Customer service is excellent.",
      date: "1 month ago"
    },
    {
      name: "Robert Evans",
      location: "Leominster",
      rating: 5,
      text: "Switched to Shire Fuels last year and haven't looked back. Consistent quality, competitive pricing, and their 4x4 delivery reaches our difficult location every time.",
      date: "2 months ago"
    }
  ]

  return (
    <section id="testimonials" className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">What Our Customers Say</h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers across Gloucestershire and the West Midlands
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex text-warning text-2xl">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <div className="text-2xl font-bold text-accent">4.9/5</div>
            <div className="text-neutral">Based on 500+ reviews</div>
          </div>
        </div>

        {/* Testimonials Grid (Element 8: Customer Testimonials) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                {/* Rating Stars */}
                <div className="flex text-warning mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-neutral mb-4">"{testimonial.text}"</p>

                {/* Customer Info */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-base-200">
                  <div className="avatar placeholder">
                    <div className="bg-accent text-white rounded-full w-12">
                      <span className="text-xl">{testimonial.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-accent">{testimonial.name}</div>
                    <div className="text-sm text-neutral/70">{testimonial.location}</div>
                  </div>
                  <div className="text-xs text-neutral/50">{testimonial.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral mb-4">See all our reviews on Google</p>
          <button className="btn btn-outline btn-accent">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            View Google Reviews
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
