import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Card from '../shared/Card'
import Table from '../shared/Table'

const ViewCustomerModal = ({ isOpen, onClose, customer, onEdit, onDelete, onBookDelivery, onCreateInvoice }) => {
  const [activeTab, setActiveTab] = useState('details')

  if (!customer) return null

  // Mock data - replace with Supabase queries
  const deliveryHistory = [
    { id: 1, date: '2024-01-18', product: 'Heating Oil', quantity: '500L', amount: '£425.00', status: 'completed' },
    { id: 2, date: '2023-12-15', product: 'Heating Oil', quantity: '600L', amount: '£510.00', status: 'completed' },
    { id: 3, date: '2023-11-20', product: 'Red Diesel', quantity: '800L', amount: '£736.00', status: 'completed' }
  ]

  const invoiceHistory = [
    { id: 1, invoice_number: 'INV-2024-001', date: '2024-01-18', amount: '£425.00', status: 'paid' },
    { id: 2, invoice_number: 'INV-2023-245', date: '2023-12-15', amount: '£510.00', status: 'paid' },
    { id: 3, invoice_number: 'INV-2023-198', date: '2023-11-20', amount: '£736.00', status: 'overdue' }
  ]

  const deliveryColumns = [
    {
      header: 'Date',
      accessor: 'date',
      render: (row) => new Date(row.date).toLocaleDateString('en-GB')
    },
    {
      header: 'Product',
      accessor: 'product'
    },
    {
      header: 'Quantity',
      accessor: 'quantity'
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (row) => <span className="font-semibold">{row.amount}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          {row.status}
        </span>
      )
    }
  ]

  const invoiceColumns = [
    {
      header: 'Invoice #',
      accessor: 'invoice_number',
      render: (row) => <span className="font-mono text-sm">{row.invoice_number}</span>
    },
    {
      header: 'Date',
      accessor: 'date',
      render: (row) => new Date(row.date).toLocaleDateString('en-GB')
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (row) => <span className="font-semibold">{row.amount}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const colors = {
          'paid': 'bg-green-100 text-green-700',
          'pending': 'bg-yellow-100 text-yellow-700',
          'overdue': 'bg-red-100 text-red-700'
        }
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[row.status]}`}>
            {row.status}
          </span>
        )
      }
    }
  ]

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${customer.name}? This action cannot be undone.`)) {
      onDelete?.(customer.id)
      onClose()
    }
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8 max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Customer since {new Date(customer.created_at || Date.now()).toLocaleDateString('en-GB')}
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
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-3">
                <button
                  onClick={() => onEdit?.(customer)}
                  className="px-4 py-2 bg-[#2a4f8e] text-white rounded-lg hover:bg-[#1e3a6b] transition-colors font-semibold text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Customer
                </button>
                <button
                  onClick={() => onBookDelivery?.(customer)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  Book Delivery
                </button>
                <button
                  onClick={() => onCreateInvoice?.(customer)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Create Invoice
                </button>
                <button
                  onClick={handleDelete}
                  className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>

              {/* Tabs */}
              <div className="px-6 border-b border-gray-200">
                <div className="flex gap-4">
                  {['details', 'deliveries', 'invoices', 'notes'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-[#2a4f8e] text-[#2a4f8e]'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'details' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium text-gray-900">{customer.email || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium text-gray-900">{customer.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Customer Type</p>
                          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                            {customer.customer_type || 'Residential'}
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Card>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Address</h3>
                      <div className="space-y-1">
                        <p className="text-gray-900">{customer.address_line1}</p>
                        {customer.address_line2 && <p className="text-gray-900">{customer.address_line2}</p>}
                        <p className="text-gray-900">{customer.city}</p>
                        {customer.county && <p className="text-gray-900">{customer.county}</p>}
                        <p className="font-semibold text-gray-900">{customer.postcode}</p>
                      </div>
                    </Card>

                    <Card className="md:col-span-2">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Statistics</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-[#2a4f8e]">{deliveryHistory.length}</p>
                          <p className="text-sm text-gray-600 mt-1">Total Deliveries</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">£1,671.00</p>
                          <p className="text-sm text-gray-600 mt-1">Total Spent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600">1,900L</p>
                          <p className="text-sm text-gray-600 mt-1">Total Litres</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {activeTab === 'deliveries' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery History</h3>
                    {deliveryHistory.length > 0 ? (
                      <Table
                        columns={deliveryColumns}
                        data={deliveryHistory}
                        onRowClick={(row) => console.log('Delivery:', row)}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-600">No deliveries yet</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'invoices' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Invoice History</h3>
                    {invoiceHistory.length > 0 ? (
                      <Table
                        columns={invoiceColumns}
                        data={invoiceHistory}
                        onRowClick={(row) => console.log('Invoice:', row)}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-600">No invoices yet</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Notes</h3>
                    <Card>
                      {customer.notes ? (
                        <p className="text-gray-900 whitespace-pre-wrap">{customer.notes}</p>
                      ) : (
                        <p className="text-gray-500 italic">No notes added yet</p>
                      )}
                    </Card>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ViewCustomerModal
