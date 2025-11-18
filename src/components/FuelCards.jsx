import React from 'react'
import FadeContent from './FadeContent'

const FuelCards = () => {
  const stats = [
    { value: "3,300+", label: "Fuel Stations", sublabel: "Nationwide Coverage" },
    { value: "100%", label: "HMRC Compliant", sublabel: "VAT Reclaim Ready" },
    { value: "24/7", label: "Support Available", sublabel: "Always Here" }
  ]

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Nationwide Coverage",
      stat: "3,300+",
      description: "One of the UK's largest combined network of brands across the country"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Fixed Weekly Pricing",
      stat: "1",
      description: "Competitive rates locked in for the week, wherever you fill up"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Simple Invoicing",
      stat: "1",
      description: "All transactions consolidated into one weekly HMRC-compliant invoice"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "PIN Protection",
      stat: "100%",
      description: "Every card is PIN protected with customizable usage restrictions"
    }
  ]

  const benefits = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: "Easy Navigation",
      description: "Find the nearest fuel stations wherever you go using the UK Fuels e-route app on your phone, or downloaded to your Sat Nav. Lists all facilities at each site.",
      highlight: "e-route App"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Smart Tracking",
      description: "Group fuel purchases by driver, vehicle or card at the click of a mouse. Download data as spreadsheets - no more manual logging of fuel receipts.",
      highlight: "Velocity Platform"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Fuel Control",
      description: "Allocate cards to specific drivers or vehicles. Set customized purchasing restrictions on individual cards to minimize unauthorized use and reduce costs.",
      highlight: "Custom Controls"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          .heading-font {
            letter-spacing: 0.02em;
          }

          .stat-card {
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(77, 151, 60, 0.1), transparent);
            transition: left 0.6s ease;
          }

          .stat-card:hover::before {
            left: 100%;
          }

          .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(38, 75, 140, 0.15);
          }

          .feature-card {
            position: relative;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
          }

          .feature-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #4D973C, #3082B4);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .feature-card:hover::after {
            transform: scaleX(1);
          }

          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 24px 48px rgba(38, 75, 140, 0.2);
          }

          .feature-card .stat-number {
            font-size: 4rem;
            font-weight: 800;
            line-height: 1;
            background: linear-gradient(135deg, #264B8C, #4D973C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            opacity: 0.15;
            position: absolute;
            top: 1rem;
            right: 1rem;
            transition: all 0.5s ease;
          }

          .feature-card:hover .stat-number {
            opacity: 0.25;
            transform: scale(1.1);
          }

          .benefit-card {
            position: relative;
            transition: all 0.4s ease;
            border-left: 4px solid transparent;
          }

          .benefit-card:hover {
            border-left-color: #4D973C;
            transform: translateX(8px);
            background: white;
          }

          .diagonal-bg {
            position: absolute;
            width: 150%;
            height: 150%;
            background: linear-gradient(135deg, #264B8C 0%, #3082B4 100%);
            transform: rotate(-6deg);
            top: -25%;
            left: -25%;
          }

          .animated-gradient {
            background: linear-gradient(-45deg, #264B8C, #3082B4, #4D973C, #264B8C);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .cta-button {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .cta-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }

          .cta-button:hover::before {
            width: 300px;
            height: 300px;
          }
        `}
      </style>

      <div>
        {/* Hero Section */}
        <section className="relative bg-gray-50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#264B8C" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative py-12 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                {/* Left Column - Content */}
                <div>
                  <div className="text-center lg:text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-secondary/10 border border-secondary/20">
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                      <span className="text-sm font-semibold text-secondary uppercase tracking-wide">Fleet Management Solution</span>
                    </div>

                    <h1 className="text-5xl font-bold leading-tight text-gray-900 sm:text-6xl lg:text-7xl heading-font mb-6">
                      Fuel Cards Made{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10 text-accent">Simple</span>
                        <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 10C60 4 140 4 198 10" stroke="#4D973C" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 sm:text-xl leading-relaxed font-medium">
                      The ideal solution for fleets of cars, vans or HGVs. National UK coverage, weekly fixed pricing, and streamlined management.
                    </p>

                    {/* CTA Form */}
                    <form action="#" method="POST" className="mt-8 sm:mt-10">
                      <div className="relative p-2 bg-white border-2 border-gray-200 group rounded-2xl focus-within:border-accent transition-all duration-300 shadow-lg">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your business email"
                          className="block w-full px-6 py-4 text-gray-900 placeholder-gray-400 bg-transparent border-0 outline-none focus:ring-0 font-medium"
                          required
                        />
                        <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                          <button
                            type="submit"
                            className="cta-button inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-accent rounded-xl hover:bg-accent/90 shadow-lg hover:shadow-xl relative overflow-hidden"
                          >
                            <span className="relative z-10">Get Started</span>
                            <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">No setup fees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Cancel anytime</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Image */}
                <div className="relative">
                  <div className="relative z-10">
                    <img
                      className="w-full rounded-2xl shadow-2xl"
                      src="/images/fuelhero.png"
                      alt="Fuel card management dashboard"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className="hidden w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent via-primary to-secondary flex-col items-center justify-center text-white shadow-2xl">
                      <svg className="w-24 h-24 mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <p className="text-sm font-medium opacity-80">Add fuelhero.png to /public/images/</p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-0"></div>
                  <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-0"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-y border-gray-200">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <FadeContent key={index} direction="up" delay={index * 100}>
                  <div className="stat-card text-center p-8 bg-gray-50 rounded-2xl">
                    <div className="text-5xl sm:text-6xl font-black heading-font text-accent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.sublabel}
                    </div>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-accent/10 border border-accent/20">
                <span className="text-sm font-bold text-accent uppercase tracking-wide">Features</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 heading-font mb-4 flex items-center justify-center gap-3">
                Everything You Need to Manage Your Fleet
                <img
                  src="/images/logo/final-logo-blue.svg"
                  alt=""
                  className="h-10 w-auto inline-block"
                  aria-hidden="true"
                />
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive fuel card solutions designed for efficiency and control
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <FadeContent key={index} direction="up" delay={index * 100}>
                  <div className="feature-card relative bg-white rounded-2xl p-8 shadow-lg">
                    <span className="stat-number heading-font">{feature.stat}</span>

                    <div className="flex items-start gap-4 relative z-10">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 heading-font">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="diagonal-bg"></div>

          <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white heading-font mb-4 flex items-center justify-center gap-3">
                Barrels of Benefits
                <img
                  src="/images/logo/final-logo-white.svg"
                  alt=""
                  className="h-10 w-auto inline-block"
                  aria-hidden="true"
                />
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Advanced tools and features to streamline your fleet operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <FadeContent key={index} direction="up" delay={index * 150}>
                  <div className="benefit-card group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        {benefit.icon}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-wide">
                        {benefit.highlight}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-accent mb-4 heading-font transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-white/90 group-hover:text-gray-700 leading-relaxed transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="animated-gradient p-12 sm:p-16 text-center">
                <FadeContent direction="up">
                  <h2 className="text-4xl sm:text-5xl font-bold text-white heading-font mb-6 flex items-center justify-center gap-3">
                    Ready to Simplify Your Fleet Management?
                    <img
                      src="/images/logo/final-logo-white.svg"
                      alt=""
                      className="h-10 w-auto inline-block"
                      aria-hidden="true"
                    />
                  </h2>
                  <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Join hundreds of businesses across the UK who trust Shire Fuels for their fuel card needs
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="cta-button group px-8 py-4 bg-white text-accent rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3">
                      <span className="relative z-10">Enquire Now</span>
                      <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>

                    <button className="group px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-accent transition-all duration-300 flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call 01594 738139</span>
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-12 pt-8 border-t border-white/20">
                    <div className="flex flex-wrap justify-center gap-8 items-center text-white">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="font-bold">PIN Protected</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-bold">HMRC Compliant</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-bold">3,300+ Stations</span>
                      </div>
                    </div>
                  </div>
                </FadeContent>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FuelCards
