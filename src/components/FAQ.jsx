import React from 'react'
import SplitText from './SplitText'

const FAQ = () => {
  const faqs = [
    {
      question: "What areas do you deliver to?",
      answer: "We deliver fuel across Gloucestershire and the West Midlands, including Worcester, Hereford, Gloucester, Cheltenham, Forest of Dean, and surrounding areas. Use our postcode checker to confirm if we cover your location."
    },
    {
      question: "How quickly can you deliver?",
      answer: "Standard delivery is within 24-48 hours. We also offer 24/7 emergency delivery service for urgent requirements. Emergency deliveries can often be arranged within a few hours, subject to availability. Additional charges apply for out-of-hours emergency service."
    },
    {
      question: "What is your minimum order quantity?",
      answer: "We accommodate both small and large orders. Our flexible approach means we can deliver quantities to suit your needs, whether you're a household customer or a commercial business requiring bulk deliveries."
    },
    {
      question: "Do you deliver in bad weather?",
      answer: "Yes! Our 4x4 delivery vehicles are specifically designed to reach difficult locations in challenging weather conditions. Rain, frost, or difficult terrain - we can deliver where others can't."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfer, credit/debit cards, and fuel cards. Payment terms can be discussed with our team when placing your order."
    },
    {
      question: "Is emergency delivery available on bank holidays?",
      answer: "Yes, our 24/7 emergency delivery service operates every day of the year, including bank holidays and weekends. Please note that additional call-out charges apply for out-of-hours deliveries."
    },
    {
      question: "What types of fuel do you supply?",
      answer: "We supply domestic heating oil (kerosene), red diesel for agricultural and commercial use, fuel cards, oils and lubricants, AdBlue, and oil tanks. We also offer additives and greases."
    },
    {
      question: "How do I check if you cover my postcode?",
      answer: "You can use the postcode checker on our website, or simply call us on 01594 738139. Our team will be happy to confirm coverage for your area and provide a competitive quote."
    },
    {
      question: "Are your prices competitive?",
      answer: "As an independent distributor, we focus on providing competitive pricing without compromising on quality or service. Contact us for a quote and we'll ensure you get the best value for your fuel delivery."
    },
    {
      question: "Do you offer regular delivery contracts?",
      answer: "Yes, we can arrange regular delivery schedules for both domestic and commercial customers. This ensures you never run out of fuel and can help you budget more effectively. Contact us to discuss your requirements."
    }
  ]

  return (
    <section id="faq" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4 flex items-center justify-center gap-3">
            <SplitText text="Frequently Asked Questions" className="inline-block" delay={40} />
            <img
              src="/images/logo/final-logo-blue.svg"
              alt=""
              className="h-10 w-auto inline-block"
              aria-hidden="true"
            />
          </h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            Find answers to common questions about our fuel delivery service
          </p>
        </div>

        {/* FAQ Accordion (Element 9: FAQ Section) */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-200 mb-3 rounded-lg">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-bold text-accent pr-12">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-neutral pt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 p-8 bg-base-200 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-accent mb-4">Still have questions?</h3>
          <p className="text-neutral mb-6">
            Our friendly team is here to help. Give us a call or send us an email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:01594738139" className="btn btn-primary text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <a href="mailto:info@shirefuels.co.uk" className="btn btn-outline btn-accent">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
