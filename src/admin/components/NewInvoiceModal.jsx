import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const NewInvoiceModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    customer_id: '',
    customer_name: '',
    due_date: '',
    subtotal: '',
    tax_amount: '0',
    notes: ''
  })

  // Mock customers - replace with Supabase query
  const customers = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Green Valley Farm' },
    { id: '3', name: 'Brown & Co' },
    { id: '4', name: 'Emma Wilson' },
    { id: '5', name: 'David Taylor' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    const subtotal = parseFloat(formData.subtotal)
    const taxAmount = parseFloat(formData.tax_amount) || 0
    const totalAmount = subtotal + taxAmount

    // TODO: Save to Supabase
    // const { data, error } = await supabase
    //   .from('invoices')
    //   .insert([{
    //     customer_id: formData.customer_id,
    //     customer_name: formData.customer_name,
    //     issue_date: new Date().toISOString().split('T')[0],
    //     due_date: formData.due_date,
    //     subtotal: subtotal,
    //     tax_amount: taxAmount,
    //     total_amount: totalAmount,
    //     amount_paid: 0,
    //     status: 'pending',
    //     notes: formData.notes
    //   }])

    const newInvoice = {
      id: Date.now().toString(),
      invoice_number: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      customer_id: formData.customer_id,
      customer_name: formData.customer_name,
      issue_date: new Date().toISOString().split('T')[0],
      due_date: formData.due_date,
      subtotal: subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      amount_paid: 0,
      status: 'pending',
      payment_date: null,
      payment_method: null,
      payment_reference: '',
      notes: formData.notes
    }

    onAdd?.(newInvoice)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      customer_id: '',
      customer_name: '',
      due_date: '',
      subtotal: '',
      tax_amount: '0',
      notes: ''
    })
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'customer_id') {
      const selectedCustomer = customers.find(c => c.id === value)
      setFormData({
        ...formData,
        customer_id: value,
        customer_name: selectedCustomer ? selectedCustomer.name : ''
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const calculateTotal = () => {
    const subtotal = parseFloat(formData.subtotal) || 0
    const taxAmount = parseFloat(formData.tax_amount) || 0
    return subtotal + taxAmount
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">New Invoice</h2>
                  <p className="text-sm text-gray-600 mt-1">Create a new invoice for a customer</p>
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
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="overflow-y-auto flex-1 p-6">
                  <div className="space-y-6">
                    {/* Customer Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Customer *
                      </label>
                      <select
                        name="customer_id"
                        value={formData.customer_id}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                        required
                      >
                        <option value="">Select a customer...</option>
                        {customers.map(customer => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Due Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Amount Details */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-700">Amount Details</h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subtotal (£) *
                        </label>
                        <input
                          type="number"
                          name="subtotal"
                          value={formData.subtotal}
                          onChange={handleChange}
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                          placeholder="0.00"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tax Amount (£)
                        </label>
                        <input
                          type="number"
                          name="tax_amount"
                          value={formData.tax_amount}
                          onChange={handleChange}
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      {/* Total Display */}
                      <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                          <span className="text-2xl font-bold text-[#2a4f8e]">
                            £{calculateTotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all resize-none"
                        placeholder="Additional details about this invoice..."
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 flex-shrink-0">
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
                    Create Invoice
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

export default NewInvoiceModal
