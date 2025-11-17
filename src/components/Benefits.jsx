import React from 'react'

const Benefits = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "10+ Years Industry Experience",
      description: "Trusted fuel supplier serving Gloucestershire and West Midlands with proven expertise and reliability"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Local & Family Run Business",
      description: "Independent distributor based in Cinderford, focused on customer service and competitive pricing"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Delivery Within 24-48h",
      description: "Fast, reliable delivery service with 24/7 emergency availability for urgent fuel requirements"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "4x4 Delivery",
      description: "Specialized 4x4 delivery vehicles reach difficult locations in challenging weather and terrain conditions"
    }
  ]

  return (
    <section id="services" className="py-16 bg-accent text-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">WHY CHOOSE SHIRE FUELS?</h2>
        </div>

        {/* Benefits Grid (Element 7: Core Benefits) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-primary mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-white/90">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Company Description */}
        <div className="max-w-3xl mx-auto text-center mt-12 pt-12 border-t border-white/20">
          <p className="text-lg mb-4">
            Shire Fuels is a family-run fuel supplier based in the heart of Gloucestershire. Our slogan is that we will deliver where others can't, as an independent distributor customer service is at the core of our business.
          </p>
          <p className="text-lg">
            We are committed to providing the very best quality products, at competitive prices with an unbeatable delivery service. Don't hesitate to contact us today!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Benefits
