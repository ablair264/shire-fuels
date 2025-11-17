import React from 'react'
import SplitText from './SplitText'
import FadeContent from './FadeContent'
import AnimatedList from './AnimatedList'
import Plasma from './Plasma'

const FuelCards = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: "Easy Navigation",
      description: "Find the nearest fuel stations wherever you go by using the UK Fuels e-route app on your phone, or downloaded to your Sat Nav, to find the nearest fuel stations to your current location or any address you enter. It also lists the facilities at each site."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Efficient Invoicing",
      description: "All the week's transactions, by every driver, are listed on a single invoice. Our invoices are HMRC compliant so reclaiming VAT is easy."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Payment Tracking",
      description: "In the UK Fuels website and app, Velocity, you can group fuel purchases by driver, vehicle or card at the click of a mouse. Downloading the data as a spreadsheet means you no longer need to log fuel receipts by hand."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure Protection",
      description: "All fuel cards are PIN protected. You can allocate each card to a specific driver or vehicle. Set customized purchasing restrictions on individual cards to reduce the risk of them being misused."
    }
  ]

  const features = [
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "COVERAGE",
      description: "One of the UK's largest combined network of brands, with over 3,300 fuel stations"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "COMPETITIVE",
      description: "Enjoy competitive pricing at one weekly fixed price wherever you fill up"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
        </svg>
      ),
      title: "SAVINGS",
      description: "Claim back VAT easily with HMRC-compliant invoices"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "SUPPORT",
      description: "Plan where to fill up using e-route on your smartphone or SatNav"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        {/* Plasma Background with company colors */}
        <div className="absolute inset-0 z-0">
          <Plasma
            color="#264b8c"
            speed={0.5}
            opacity={1.0}
            mouseInteractive={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/40 to-secondary/40"></div>
        </div>

        {/* Wave divider at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-br from-transparent via-accent/20 to-accent z-10"></div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <SplitText text="FUEL CARDS" className="inline-block" delay={50} />
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-4 font-medium">
              The ideal solution for fleets of cars, vans or HGVs
            </p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl">
              The Shire Fuels fuel card gives you national UK coverage at convenient locations with weekly fixed pricing, making fleet management simple and cost-effective.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary btn-lg text-white text-lg px-8">
                ENQUIRE NOW
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

      {/* Benefits Section - "Barrels of Benefits" */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <FadeContent direction="up" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <SplitText text="BARRELS OF BENEFITS" className="inline-block" delay={30} />
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              The Shire Fuels fuel card is the ideal solution for those with a fleet of cars, vans or HGVs, giving national UK coverage at convenient locations and weekly fixed pricing.
            </p>
          </FadeContent>

          {/* Benefits Grid */}
          <AnimatedList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" delay={100}>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="text-primary mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-white/90">{benefit.description}</p>
              </div>
            ))}
          </AnimatedList>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Features Grid */}
          <AnimatedList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" delay={150}>
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-secondary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </AnimatedList>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeContent direction="up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Simplify Your Fleet Management?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses across the UK who trust Shire Fuels fuel cards for their fleet needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-white text-accent hover:bg-white/90 border-none text-lg px-8">
                ENQUIRE NOW
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-accent text-lg px-8">
                DOWNLOAD E-ROUTE APP
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </FadeContent>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-bold text-lg">PIN Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-bold text-lg">HMRC Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-bold text-lg">3,300+ Stations</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FuelCards
