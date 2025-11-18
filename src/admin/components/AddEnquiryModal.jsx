import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const AddEnquiryModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    service: '',
    notes: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // TODO: Save to Supabase
    // const { data, error } = await supabase
    //   .from('enquiries')
    //   .insert([{
    //     ...formData,
    //     status: 'new',
    //     created_at: new Date().toISOString()
    //   }])

    // Mock data for now
    const newEnquiry = {
      id: Date.now(),
      ...formData,
      status: 'new',
      date: new Date().toLocaleDateString('en-GB')
    }

    onAdd?.(newEnquiry)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      postcode: '',
      service: '',
      notes: ''
    })
    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">New Enquiry</h2>
                  <p className="text-sm text-gray-600 mt-1">Add a new customer enquiry</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                      placeholder="Customer name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                      placeholder="customer@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                      placeholder="01234 567890"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Postcode *
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                      placeholder="GL16 8BE"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Required *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                    required
                  >
                    <option value="">Please Select</option>
                    <option value="heating-oil">Heating Oil</option>
                    <option value="red-diesel">Red Diesel</option>
                    <option value="fuel-cards">Fuel Cards</option>
                    <option value="oil-tanks">Oil Tanks</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all resize-none"
                    placeholder="Additional information..."
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2a4f8e] to-[#264B8C] text-white font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Add Enquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddEnquiryModal
