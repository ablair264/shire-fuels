import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Card from '../shared/Card'

const ViewInvoiceModal = ({ isOpen, onClose, invoice, onEdit, onCancel, onMarkAsPaid }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentData, setPaymentData] = useState({
    payment_method: '',
    payment_reference: ''
  })

  if (!invoice) return null

  const handleMarkAsPaid = () => {
    if (!paymentData.payment_method) {
      alert('Please enter a payment method')
      return
    }

    onMarkAsPaid?.(invoice.id, paymentData)
    setShowPaymentForm(false)
    setPaymentData({ payment_method: '', payment_reference: '' })
    onClose()
  }

  const handleCancel = () => {
    onCancel?.(invoice.id)
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
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-mono">{invoice.invoice_number}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Issued on {new Date(invoice.issue_date).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-3 flex-shrink-0">
                {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                  <>
                    <button
                      onClick={() => setShowPaymentForm(!showPaymentForm)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => onEdit?.(invoice)}
                      className="px-4 py-2 bg-[#2a4f8e] text-white rounded-lg hover:bg-[#1e3a6b] transition-colors font-semibold text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Invoice
                    </button>
                    <button
                      onClick={handleCancel}
                      className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel Invoice
                    </button>
                  </>
                )}
                {invoice.status === 'paid' && (
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Invoice Paid</span>
                  </div>
                )}
                {invoice.status === 'cancelled' && (
                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Invoice Cancelled</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Payment Form (if showing) */}
                {showPaymentForm && invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                  <Card className="mb-6 bg-green-50 border-2 border-green-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Record Payment</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Method *
                        </label>
                        <select
                          value={paymentData.payment_method}
                          onChange={(e) => setPaymentData({ ...paymentData, payment_method: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 outline-none transition-all"
                          required
                        >
                          <option value="">Select payment method...</option>
                          <option value="Cash">Cash</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Card">Card</option>
                          <option value="Cheque">Cheque</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Reference
                        </label>
                        <input
                          type="text"
                          value={paymentData.payment_reference}
                          onChange={(e) => setPaymentData({ ...paymentData, payment_reference: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 outline-none transition-all"
                          placeholder="e.g., TXN-12345, CHQ-001, etc."
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={handleMarkAsPaid}
                          className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex-1"
                        >
                          Confirm Payment
                        </button>
                        <button
                          onClick={() => {
                            setShowPaymentForm(false)
                            setPaymentData({ payment_method: '', payment_reference: '' })
                          }}
                          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="space-y-4">
                  {/* Customer & Dates - Single Row */}
                  <Card>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer</h3>
                        <p className="font-semibold text-gray-900">{invoice.customer_name}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {invoice.customer_id}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Issue Date</h3>
                        <p className="font-medium text-gray-900">
                          {new Date(invoice.issue_date).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Due Date</h3>
                        <p className="font-medium text-gray-900">
                          {new Date(invoice.due_date).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Amount Breakdown */}
                  <Card>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Amount Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Subtotal</span>
                        <span className="font-medium text-gray-900">£{(invoice.subtotal || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Tax</span>
                        <span className="font-medium text-gray-900">£{(invoice.tax_amount || 0).toFixed(2)}</span>
                      </div>
                      <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-[#2a4f8e]">£{(invoice.total_amount || 0).toFixed(2)}</span>
                      </div>
                      {(invoice.amount_paid || 0) > 0 && (
                        <>
                          <div className="flex justify-between items-center text-green-600">
                            <span className="font-medium">Amount Paid</span>
                            <span className="font-bold">£{(invoice.amount_paid || 0).toFixed(2)}</span>
                          </div>
                          {(invoice.amount_paid || 0) < (invoice.total_amount || 0) && (
                            <div className="flex justify-between items-center text-orange-600">
                              <span className="font-medium">Outstanding</span>
                              <span className="font-bold">£{((invoice.total_amount || 0) - (invoice.amount_paid || 0)).toFixed(2)}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Card>

                  {/* Status & Payment Details Combined */}
                  <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Status</h3>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                            invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            invoice.status === 'overdue' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                          {invoice.status === 'overdue' && (
                            <span className="text-xs text-red-600 font-medium">
                              {Math.floor((new Date() - new Date(invoice.due_date)) / (1000 * 60 * 60 * 24))} days overdue
                            </span>
                          )}
                        </div>
                      </div>
                      {invoice.status === 'paid' && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Details</h3>
                          <div className="space-y-1">
                            {invoice.payment_method && (
                              <p className="text-sm text-gray-900">
                                <span className="text-gray-600">Method:</span> {invoice.payment_method}
                              </p>
                            )}
                            {invoice.payment_reference && (
                              <p className="text-sm text-gray-900">
                                <span className="text-gray-600">Reference:</span> <span className="font-mono">{invoice.payment_reference}</span>
                              </p>
                            )}
                            {invoice.payment_date && (
                              <p className="text-sm text-gray-900">
                                <span className="text-gray-600">Paid:</span> {new Date(invoice.payment_date).toLocaleDateString('en-GB')}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Notes */}
                  {invoice.notes && (
                    <Card>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Notes</h3>
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{invoice.notes}</p>
                    </Card>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ViewInvoiceModal
