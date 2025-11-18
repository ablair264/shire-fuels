import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import EnquiryConfirmationModal from './EnquiryConfirmationModal'

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    service: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Save enquiry to Supabase
      const { data, error } = await supabase
        .from('enquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          postcode: formData.postcode,
          service: formData.service,
          status: 'new',
          source: 'website'
        }])

      if (error) throw error

      // Show success modal
      setIsModalOpen(true)

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        postcode: '',
        service: '',
      })
    } catch (err) {
      console.error('Error submitting enquiry:', err)
      setError('Failed to submit enquiry. Please try again or call us at 01594 738139.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <section className="bg-accent text-white py-6">
        <div className="container mx-auto px-4">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}

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
              disabled={isSubmitting}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full lg:w-auto lg:flex-1 bg-white text-neutral"
              required
              disabled={isSubmitting}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full lg:w-auto lg:flex-1 bg-white text-neutral"
              required
              disabled={isSubmitting}
            />

            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="input input-bordered w-full lg:w-auto lg:flex-1 bg-white text-neutral"
              required
              disabled={isSubmitting}
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="select select-bordered w-full lg:w-auto lg:flex-1 bg-white text-neutral"
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>Please Select</option>
              <option value="heating-oil">Heating Oil</option>
              <option value="red-diesel">Red Diesel</option>
              <option value="fuel-cards">Fuel Cards</option>
              <option value="oil-tanks">Oil Tanks</option>
              <option value="other">Other</option>
            </select>

            <button
              type="submit"
              className="btn btn-primary w-full lg:w-auto px-8 text-white disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SUBMITTING...' : 'BOOK FUEL DELIVERY'}
            </button>
          </form>
        </div>
      </section>

      {/* Confirmation Modal */}
      <EnquiryConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default QuoteForm
