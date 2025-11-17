import React from 'react'
import Hero from '../components/Hero'
import QuoteForm from '../components/QuoteForm'
import Benefits from '../components/Benefits'
import Services from '../components/Services'
import Coverage from '../components/Coverage'
import Emergency from '../components/Emergency'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Elements 3, 4, 5: Title/Subtitle, Primary CTA, Social Proof */}
      <Hero />

      {/* Quick Quote Form */}
      <QuoteForm />

      {/* Element 7: Core Benefits/Features */}
      <Benefits />

      {/* Element 6: Images/Videos */}
      <Services />

      {/* Coverage Area */}
      <Coverage />

      {/* Emergency Service Highlight */}
      <Emergency />

      {/* Element 8: Customer Testimonials */}
      <Testimonials />

      {/* Element 9: FAQ Section */}
      <FAQ />

      {/* Element 10: Final CTA */}
      <FinalCTA />
    </div>
  )
}

export default HomePage
