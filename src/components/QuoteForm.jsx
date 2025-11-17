import React, { useState } from 'react'

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
    alert('Thank you! We\'ll contact you shortly.')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="bg-accent text-white py-6">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-4">
          <div className="text-xl font-bold hidden lg:block">GET IN TOUCH</div>
          
          <input 
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full lg:w-auto lg:flex-1 bg-white text-neutral"
            required
          />
          
          <input 
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full lg:w-auto lg:flex-1 bg-white text-neutral"
            required
          />
          
          <input 
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full lg:w-auto lg:flex-1 bg-white text-neutral"
            required
          />
          
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="select select-bordered w-full lg:w-auto lg:flex-1 bg-white text-neutral"
            required
          >
            <option value="" disabled>Please Select</option>
            <option value="heating-oil">Heating Oil</option>
            <option value="red-diesel">Red Diesel</option>
            <option value="fuel-cards">Fuel Cards</option>
            <option value="oil-tanks">Oil Tanks</option>
            <option value="other">Other</option>
          </select>
          
          <button type="submit" className="btn btn-primary w-full lg:w-auto px-8 text-white">
            GET A QUOTE
          </button>
        </form>
      </div>
    </section>
  )
}

export default QuoteForm
