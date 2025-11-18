import React from 'react'
import SplitText from './SplitText'

const Services = () => {
  const services = [
    {
      title: "Domestic Heating Oil",
      description: "Premium kerosene for home heating systems. Reliable delivery to households across Gloucestershire and West Midlands.",
      image: "https://images.unsplash.com/photo-1598662957477-1e636f3607f8?q=80&w=2340&auto=format&fit=crop",
      features: ["24-48 hour delivery", "Competitive pricing", "Small or large quantities"]
    },
    {
      title: "Red Diesel",
      description: "For generators, tractors, agricultural and commercial use. Bulk quantities available for farms and businesses.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2340&auto=format&fit=crop",
      features: ["Agricultural use", "Commercial grade", "Flexible delivery"]
    },
    {
      title: "Oil Tanks & Equipment",
      description: "Quality oil storage tanks and equipment. Professional installation and maintenance services available.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2340&auto=format&fit=crop",
      features: ["Range of sizes", "Expert installation", "Maintenance support"]
    }
  ]

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4 flex items-center justify-center gap-3">
            <SplitText text="Our Services" className="inline-block" delay={40} />
            <img
              src="/images/logo/final-logo-blue.svg"
              alt=""
              className="h-10 w-auto inline-block"
              aria-hidden="true"
            />
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            Comprehensive fuel supply solutions for homes, farms, and businesses across the region
          </p>
        </div>

        {/* Services Grid (Element 6: Images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-accent">{service.title}</h3>
                <p className="text-neutral">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-12 bg-base-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-accent mb-6 text-center">Additional Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">💳</div>
              <h4 className="font-bold text-accent">Fuel Cards</h4>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🛢️</div>
              <h4 className="font-bold text-accent">Oils & Lubricants</h4>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">💧</div>
              <h4 className="font-bold text-accent">AdBlue</h4>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">⚙️</div>
              <h4 className="font-bold text-accent">Additives</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
