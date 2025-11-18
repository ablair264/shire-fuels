import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  calculateAvailableTimeSlots,
  postcodeToCoordinates,
  getStandardTimeSlots,
  getRecommendedTimeSlot
} from '../utils/timeSlotCalculator'

const AddDeliveryModal = ({ isOpen, onClose, onAdd, selectedDate, existingDeliveries = [], preselectedCustomer = null }) => {
  const [step, setStep] = useState(1) // 1: Customer, 2: Delivery Details
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false)

  const [formData, setFormData] = useState({
    customer_id: '',
    customer_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    county: '',
    postcode: '',
    delivery_date: selectedDate || '',
    delivery_time_slot: '',
    product: 'heating-oil',
    quantity_litres: '',
    price_per_litre: '',
    delivery_notes: '',
    access_notes: ''
  })

  // Auto-populate form when preselected customer changes
  useEffect(() => {
    if (preselectedCustomer && isOpen) {
      setFormData(prev => ({
        ...prev,
        customer_id: preselectedCustomer.id,
        customer_name: preselectedCustomer.name,
        email: preselectedCustomer.email || '',
        phone: preselectedCustomer.phone || '',
        address_line1: preselectedCustomer.address_line1 || '',
        address_line2: preselectedCustomer.address_line2 || '',
        city: preselectedCustomer.city || '',
        county: preselectedCustomer.county || '',
        postcode: preselectedCustomer.postcode || ''
      }))
      setShowNewCustomerForm(false)
    }
  }, [preselectedCustomer, isOpen])

  // Mock customers - replace with Supabase query
  const [customers] = useState([
    { id: '1', name: 'John Smith', postcode: 'GL16 8BE', address_line1: '123 High Street', city: 'Coleford', phone: '01594 123456' },
    { id: '2', name: 'Green Valley Farm', postcode: 'GL15 6HN', address_line1: 'Green Valley Road', city: 'Lydney', phone: '01594 789012' },
    { id: '3', name: 'Brown & Co', postcode: 'GL16 7JK', address_line1: '45 Industrial Estate', city: 'Cinderford', phone: '01594 345678' },
  ])

  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [calculatingSlots, setCalculatingSlots] = useState(false)
  const [recommendedSlot, setRecommendedSlot] = useState(null)

  // Calculate time slots when postcode or date changes
  useEffect(() => {
    if (formData.postcode && formData.delivery_date) {
      calculateTimeSlots()
    }
  }, [formData.postcode, formData.delivery_date])

  const calculateTimeSlots = async () => {
    setCalculatingSlots(true)
    try {
      const coordinates = await postcodeToCoordinates(formData.postcode)

      // Filter deliveries for the selected date
      const deliveriesOnDate = existingDeliveries.filter(
        d => d.delivery_date === formData.delivery_date
      )

      const slots = await calculateAvailableTimeSlots(
        new Date(formData.delivery_date),
        deliveriesOnDate,
        coordinates
      )

      setAvailableTimeSlots(slots)

      // Get recommended slot
      const recommended = await getRecommendedTimeSlot(
        new Date(formData.delivery_date),
        deliveriesOnDate,
        coordinates
      )
      setRecommendedSlot(recommended)

      // Auto-select recommended slot if no slot selected
      if (recommended && !formData.delivery_time_slot) {
        setFormData(prev => ({ ...prev, delivery_time_slot: recommended.label }))
      }
    } catch (error) {
      console.error('Error calculating time slots:', error)
      // Fallback to standard slots
      setAvailableTimeSlots(getStandardTimeSlots())
    } finally {
      setCalculatingSlots(false)
    }
  }

  const handleCustomerSelect = (customerId) => {
    if (customerId === 'new') {
      setShowNewCustomerForm(true)
      setFormData(prev => ({ ...prev, customer_id: 'new' }))
      return
    }

    const customer = customers.find(c => c.id === customerId)
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customer_id: customerId,
        customer_name: customer.name,
        phone: customer.phone || '',
        address_line1: customer.address_line1 || '',
        address_line2: customer.address_line2 || '',
        city: customer.city || '',
        postcode: customer.postcode || ''
      }))
      setShowNewCustomerForm(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // TODO: Save to Supabase
    // If new customer, create customer first
    // Then create delivery with customer reference

    const newDelivery = {
      id: Date.now(),
      ...formData,
      status: 'scheduled',
      total_price: (parseFloat(formData.quantity_litres) * parseFloat(formData.price_per_litre || 0)).toFixed(2)
    }

    onAdd?.(newDelivery)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      customer_id: '',
      customer_name: '',
      email: '',
      phone: '',
      address_line1: '',
      address_line2: '',
      city: '',
      county: '',
      postcode: '',
      delivery_date: selectedDate || '',
      delivery_time_slot: '',
      product: 'heating-oil',
      quantity_litres: '',
      price_per_litre: '',
      delivery_notes: '',
      access_notes: ''
    })
    setStep(1)
    setShowNewCustomerForm(false)
    setAvailableTimeSlots([])
    setRecommendedSlot(null)
    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const canProceedToStep2 = formData.customer_id && formData.postcode

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">New Delivery</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {step === 1 ? 'Select customer and delivery address' : 'Set delivery details and time'}
                  </p>
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

              {/* Progress Steps */}
              <div className="px-6 pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-[#2a4f8e] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      1
                    </div>
                    <span className="text-sm font-medium">Customer</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200"></div>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-[#2a4f8e] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      2
                    </div>
                    <span className="text-sm font-medium">Delivery Details</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                {/* Step 1: Customer Selection */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Customer *
                      </label>
                      <select
                        name="customer_id"
                        value={formData.customer_id}
                        onChange={(e) => handleCustomerSelect(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                        required
                      >
                        <option value="">-- Select a customer --</option>
                        {customers.map(customer => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name} - {customer.postcode}
                          </option>
                        ))}
                        <option value="new">➕ Add New Customer</option>
                      </select>
                    </div>

                    {(formData.customer_id || showNewCustomerForm) && (
                      <>
                        {showNewCustomerForm && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Customer Name *
                              </label>
                              <input
                                type="text"
                                name="customer_name"
                                value={formData.customer_name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
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
                                required
                              />
                            </div>
                          </div>
                        )}

                        <div className="pt-4 border-t border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-700 mb-4">Delivery Address</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address Line 1 *
                              </label>
                              <input
                                type="text"
                                name="address_line1"
                                value={formData.address_line1}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                                required
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address Line 2
                              </label>
                              <input
                                type="text"
                                name="address_line2"
                                value={formData.address_line2}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                City *
                              </label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                County
                              </label>
                              <input
                                type="text"
                                name="county"
                                value={formData.county}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                                placeholder="Gloucestershire"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Delivery Details */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Delivery Date *
                        </label>
                        <input
                          type="date"
                          name="delivery_date"
                          value={formData.delivery_date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          Time Slot *
                          {calculatingSlots && (
                            <span className="text-xs text-blue-600">Calculating...</span>
                          )}
                        </label>
                        <select
                          name="delivery_time_slot"
                          value={formData.delivery_time_slot}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                          required
                        >
                          <option value="">-- Select time slot --</option>
                          {availableTimeSlots.map((slot, index) => (
                            <option key={index} value={slot.label}>
                              {slot.label}
                              {slot.distance && ` (${slot.distance}mi, ${slot.travelTime}min)`}
                              {recommendedSlot?.time === slot.time && ' ⭐ Recommended'}
                            </option>
                          ))}
                        </select>
                        {recommendedSlot && (
                          <p className="text-xs text-green-600 mt-1">
                            ⭐ Recommended slot based on optimal route
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Fuel Type *
                        </label>
                        <select
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                          required
                        >
                          <option value="heating-oil">Heating Oil</option>
                          <option value="red-diesel">Red Diesel</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Quantity (Litres) *
                        </label>
                        <input
                          type="number"
                          name="quantity_litres"
                          value={formData.quantity_litres}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                          placeholder="500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Price per Litre (£)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="price_per_litre"
                          value={formData.price_per_litre}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                          placeholder="0.85"
                        />
                      </div>

                      {formData.quantity_litres && formData.price_per_litre && (
                        <div className="flex items-end">
                          <div className="w-full px-4 py-3 rounded-xl bg-green-50 border border-green-200">
                            <p className="text-sm text-gray-600">Total Price</p>
                            <p className="text-2xl font-bold text-green-700">
                              £{(parseFloat(formData.quantity_litres) * parseFloat(formData.price_per_litre)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Notes
                      </label>
                      <textarea
                        name="delivery_notes"
                        value={formData.delivery_notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all resize-none"
                        placeholder="Any special instructions..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Access Notes
                      </label>
                      <textarea
                        name="access_notes"
                        value={formData.access_notes}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all resize-none"
                        placeholder="Access details, gate codes, etc..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  <div>
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    {step === 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!canProceedToStep2}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2a4f8e] to-[#264B8C] text-white font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        Next
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2a4f8e] to-[#264B8C] text-white font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Create Delivery
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddDeliveryModal
