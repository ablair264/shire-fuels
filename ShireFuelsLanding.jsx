import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Clock, Truck, Home, CreditCard, Droplet, Fuel, Star, CheckCircle, ArrowRight } from 'lucide-react';
import SplitText from '@/components/SplitText';

const ShireFuelsLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Hero slides content
  const slides = [
    {
      title: "DELIVERING",
      subtitle: "WHERE OTHERS CAN'T",
      description: "Based in the heart of Gloucestershire, Shire Fuels are committed to helping customers whenever and wherever they need it.",
      cta: "Learn More",
      ctaLink: "#about"
    },
    {
      title: "4X4",
      subtitle: "DELIVERY SERVICE",
      description: "Rainy nights or frosty mornings, our 4x4 delivery service will get your fuel to you no matter the conditions.",
      cta: "Get A Quote",
      ctaLink: "#quote"
    },
    {
      title: "FAMILY RUN",
      subtitle: "BUSINESS",
      description: "As a family run business, we understand the importance of providing a great customer service which is at the very core of everything we do.",
      cta: "About Us",
      ctaLink: "#about"
    }
  ];

  const services = [
    {
      icon: Home,
      title: "Domestic Services",
      description: "Kerosene heating oil delivery for households across the West Midlands. Small or large quantities, we've got you covered.",
      link: "#services",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: CreditCard,
      title: "Fuel Cards",
      description: "National UK coverage at convenient locations with weekly fixed pricing. Perfect for fleet management.",
      link: "#fuel-cards",
      color: "from-emerald-600 to-teal-600"
    },
    {
      icon: Droplet,
      title: "Oils & Lubricants",
      description: "Complete range of premium oils and lubricants for all your commercial and domestic needs.",
      link: "#oils",
      color: "from-amber-600 to-orange-600"
    },
    {
      icon: Fuel,
      title: "Oil Tanks",
      description: "High-quality oil storage tanks with professional installation and maintenance services.",
      link: "#tanks",
      color: "from-purple-600 to-pink-600"
    }
  ];

  const features = [
    { icon: CheckCircle, text: "10+ Years Industry Experience" },
    { icon: CheckCircle, text: "Local & Family Run Business" },
    { icon: CheckCircle, text: "Delivery Within 24-48h" },
    { icon: Truck, text: "4x4 Delivery Specialists" }
  ];

  const serviceAreas = [
    "Worcester", "Hereford", "Gloucester", "Cheltenham", "Tenbury Wells",
    "Leominster", "Evesham", "Broadway", "Abergavenny", "Hay-On-Wye",
    "The Forest of Dean"
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans">
      {/* Navigation */}
      <div className="navbar bg-slate-900/95 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 border-b border-emerald-500/20">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-2xl bg-slate-800 rounded-box w-52 border border-emerald-500/30">
              <li><a className="hover:bg-emerald-600">HOME</a></li>
              <li><a className="hover:bg-emerald-600">FUEL CARDS</a></li>
              <li><a className="hover:bg-emerald-600">OILS & LUBRICANTS</a></li>
              <li><a className="hover:bg-emerald-600">OIL TANKS</a></li>
              <li><a className="hover:bg-emerald-600">CONTACT</a></li>
            </ul>
          </div>
          <div className="flex items-center gap-3 ml-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
              <Fuel className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              SHIRE FUELS
            </span>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 text-sm font-semibold tracking-wide">
            <li><a className="hover:bg-emerald-600 hover:text-white transition-colors">HOME</a></li>
            <li><a className="hover:bg-emerald-600 hover:text-white transition-colors">FUEL CARDS</a></li>
            <li><a className="hover:bg-emerald-600 hover:text-white transition-colors">OILS & LUBRICANTS</a></li>
            <li><a className="hover:bg-emerald-600 hover:text-white transition-colors">OIL TANKS</a></li>
            <li><a className="hover:bg-emerald-600 hover:text-white transition-colors">CONTACT</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="badge badge-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-amber-500/50 gap-2 px-4">
            <Clock className="w-4 h-4" />
            24/7 EMERGENCY
          </div>
        </div>
      </div>

      {/* Hero Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-emerald-900/80 to-cyan-900/90 backdrop-blur-sm"></div>
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Slide Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center transition-all duration-700 ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl">
                    <div className="space-y-6">
                      <div className="overflow-hidden">
                        <h1 className={`text-7xl md:text-8xl font-black tracking-tighter transition-transform duration-1000 ${
                          index === currentSlide ? 'translate-y-0' : 'translate-y-full'
                        }`}>
                          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            <SplitText text={slide.title} className="inline-block" delay={50} />
                          </span>
                        </h1>
                      </div>
                      <div className="overflow-hidden">
                        <h2 className={`text-5xl md:text-6xl font-black text-white tracking-tight transition-transform duration-1000 delay-100 ${
                          index === currentSlide ? 'translate-y-0' : 'translate-y-full'
                        }`}>
                          <SplitText text={slide.subtitle} className="inline-block" delay={40} />
                        </h2>
                      </div>
                      <div className="overflow-hidden">
                        <p className={`text-xl text-gray-300 max-w-2xl leading-relaxed transition-transform duration-1000 delay-200 ${
                          index === currentSlide ? 'translate-y-0' : 'translate-y-full'
                        }`}>
                          {slide.description}
                        </p>
                      </div>
                      <div className={`pt-4 transition-all duration-1000 delay-300 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}>
                        <a href={slide.ctaLink} className="btn btn-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105 transition-all group">
                          <span className="text-lg font-bold">{slide.cta}</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-12 bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/50' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle bg-white/10 backdrop-blur-md border-white/20 hover:bg-emerald-500/50 text-white z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle bg-white/10 backdrop-blur-md border-white/20 hover:bg-emerald-500/50 text-white z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Quote Form Section */}
      <div className="relative -mt-20 z-20" id="quote">
        <div className="container mx-auto px-4">
          <div className="card bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl border border-emerald-500/30 backdrop-blur-xl">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-none">
                  <h3 className="text-2xl font-black text-white tracking-wide">GET IN TOUCH</h3>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="input input-bordered bg-slate-700/50 border-emerald-500/30 focus:border-emerald-500 text-white placeholder:text-gray-400" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="input input-bordered bg-slate-700/50 border-emerald-500/30 focus:border-emerald-500 text-white placeholder:text-gray-400" 
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="input input-bordered bg-slate-700/50 border-emerald-500/30 focus:border-emerald-500 text-white placeholder:text-gray-400" 
                  />
                  <select className="select select-bordered bg-slate-700/50 border-emerald-500/30 focus:border-emerald-500 text-white">
                    <option>Please Select</option>
                    <option>Gas Oil</option>
                    <option>Kerosene</option>
                  </select>
                </div>
                <button className="btn bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105 transition-all">
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-24 relative overflow-hidden" id="animate-services">
        {/* Diagonal Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible['animate-services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              <SplitText text="OUR" className="inline-block" delay={40} /> <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"><SplitText text="SERVICES" className="inline-block" delay={40} /></span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive fuel solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`card bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-emerald-500/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-2 group ${
                    isVisible['animate-services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="card-body items-center text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="card-title text-white text-xl font-bold">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                    <div className="card-actions mt-4">
                      <a href={service.link} className="btn btn-sm btn-ghost text-emerald-400 hover:bg-emerald-500/20 group/btn">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Delivery Info Section */}
      <div className="py-24 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 relative overflow-hidden" id="animate-delivery">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${
              isVisible['animate-delivery'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="inline-block mb-6">
                <div className="badge badge-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 gap-2 px-4 py-4">
                  <Truck className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-wide">DELIVERY SPECIALISTS</span>
                </div>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                <SplitText text="DELIVERING" className="inline-block" delay={40} /><br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  <SplitText text="WHERE OTHERS CAN'T" className="inline-block" delay={40} />
                </span>
              </h2>
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg text-gray-300 font-semibold">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="card bg-slate-800/80 backdrop-blur-sm border border-emerald-500/30 shadow-xl">
                <div className="card-body">
                  <h3 className="text-xl font-bold text-white mb-4">CHECK YOUR AREA</h3>
                  <p className="text-gray-400 mb-4">
                    At Shire Fuels we're committed to providing the very best in customer service to a diverse customer base across the West Midlands, from households to rural farms and commercial premises.
                  </p>
                  <div className="join w-full">
                    <input 
                      type="text" 
                      placeholder="Start typing your postcode..." 
                      className="input input-bordered join-item w-full bg-slate-700/50 border-emerald-500/30 focus:border-emerald-500 text-white placeholder:text-gray-400" 
                    />
                    <button className="btn join-item bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold">
                      Check
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${
              isVisible['animate-delivery'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="card bg-slate-800/80 backdrop-blur-sm border border-emerald-500/30 shadow-2xl">
                <div className="card-body">
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <MapPin className="w-8 h-8 text-emerald-400" />
                    SERVING CUSTOMERS IN
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.map((area, index) => (
                      <div
                        key={index}
                        className="badge badge-lg bg-slate-700/50 border-emerald-500/30 text-gray-300 hover:bg-emerald-500/20 hover:border-emerald-500 transition-all cursor-default"
                        style={{
                          animation: `fadeIn 0.5s ease-out ${index * 50}ms both`
                        }}
                      >
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Service Section */}
      <div className="py-24 relative overflow-hidden" id="animate-emergency">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className={`card bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20 transition-all duration-1000 ${
              isVisible['animate-emergency'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="card-body items-center text-center p-12">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/50 animate-pulse">
                  <Clock className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  <SplitText text="RUN OUT OF FUEL?" className="inline-block" delay={40} />
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
                  Mistakes happen... Whether you've run out of fuel on a bank holiday evening or a Sunday morning, we can deliver your fuel to you any time of the day or night!
                </p>
                <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-slate-700/50 border border-amber-500/30">
                  <div className="stat place-items-center">
                    <div className="stat-title text-gray-400">Service</div>
                    <div className="stat-value text-amber-400">24/7</div>
                    <div className="stat-desc text-gray-300">Always Available</div>
                  </div>
                  <div className="stat place-items-center">
                    <div className="stat-title text-gray-400">Response</div>
                    <div className="stat-value text-emerald-400">FAST</div>
                    <div className="stat-desc text-gray-300">Emergency Delivery</div>
                  </div>
                  <div className="stat place-items-center">
                    <div className="stat-title text-gray-400">Coverage</div>
                    <div className="stat-value text-cyan-400">WIDE</div>
                    <div className="stat-desc text-gray-300">West Midlands</div>
                  </div>
                </div>
                <button className="btn btn-lg bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white font-bold shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 hover:scale-105 transition-all mt-8 group">
                  <Phone className="w-5 h-5" />
                  <span className="text-xl">CALL NOW: 01594 738139</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-sm text-gray-400 mt-6">
                  *Additional call-out charges apply for out of hours deliveries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" id="animate-about">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible['animate-about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <SplitText text="ABOUT" className="inline-block" delay={40} /> <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"><SplitText text="SHIRE FUELS" className="inline-block" delay={40} /></span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Shire Fuels is a family-run fuel supplier based in the heart of Gloucestershire. Our slogan is that we will deliver where others can't, as an independent distributor customer service is at the core of our business.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              We are committed to providing the very best quality products, at competitive prices with an unbeatable delivery service. Don't hesitate to contact us today!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Footer */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-t border-emerald-500/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">SHIRE</span> FUELS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 shadow-xl">
              <div className="card-body items-center text-center">
                <Phone className="w-8 h-8 text-emerald-400 mb-2" />
                <h3 className="font-bold text-white">PHONE</h3>
                <a href="tel:01594738139" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  01594 738139
                </a>
              </div>
            </div>
            <div className="card bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 shadow-xl">
              <div className="card-body items-center text-center">
                <Mail className="w-8 h-8 text-emerald-400 mb-2" />
                <h3 className="font-bold text-white">EMAIL</h3>
                <a href="mailto:info@shirefuels.co.uk" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  info@shirefuels.co.uk
                </a>
              </div>
            </div>
            <div className="card bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 shadow-xl">
              <div className="card-body items-center text-center">
                <MapPin className="w-8 h-8 text-emerald-400 mb-2" />
                <h3 className="font-bold text-white">ADDRESS</h3>
                <p className="text-gray-300 text-sm">
                  Unit 20 Foxes Bridge Road<br />
                  Forest Vale Ind. Estate<br />
                  Cinderford, GL14 2PQ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ShireFuelsLanding;
