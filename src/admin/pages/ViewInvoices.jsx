import React, { useState } from 'react'
import { motion } from 'motion/react'
import PageHeader from '../shared/PageHeader'
import Card from '../shared/Card'
import Table from '../shared/Table'
import NewInvoiceModal from '../components/NewInvoiceModal'
import ViewInvoiceModal from '../components/ViewInvoiceModal'
import EditInvoiceModal from '../components/EditInvoiceModal'
import ViewCustomerModal from '../components/ViewCustomerModal'

const ViewInvoices = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - replace with Supabase query
  const [invoices, setInvoices] = useState([
    {
      id: '1',
      invoice_number: 'INV-2024-001',
      customer_id: '1',
      customer_name: 'John Smith',
      issue_date: '2024-01-18',
      due_date: '2024-02-18',
      subtotal: 425.00,
      tax_amount: 0,
      total_amount: 425.00,
      amount_paid: 425.00,
      status: 'paid',
      payment_date: '2024-01-20',
      payment_method: 'Bank Transfer',
      payment_reference: 'REF-12345',
      notes: 'Heating oil delivery - 500L'
    },
    {
      id: '2',
      invoice_number: 'INV-2024-002',
      customer_id: '2',
      customer_name: 'Green Valley Farm',
      issue_date: '2024-01-15',
      due_date: '2024-01-30',
      subtotal: 736.00,
      tax_amount: 0,
      total_amount: 736.00,
      amount_paid: 0,
      status: 'overdue',
      payment_date: null,
      payment_method: null,
      payment_reference: '',
      notes: 'Red diesel - 800L'
    },
    {
      id: '3',
      invoice_number: 'INV-2024-003',
      customer_id: '3',
      customer_name: 'Brown & Co',
      issue_date: '2024-01-20',
      due_date: '2024-02-20',
      subtotal: 510.00,
      tax_amount: 0,
      total_amount: 510.00,
      amount_paid: 0,
      status: 'pending',
      payment_date: null,
      payment_method: null,
      payment_reference: '',
      notes: 'Monthly delivery'
    },
    {
      id: '4',
      invoice_number: 'INV-2024-004',
      customer_id: '4',
      customer_name: 'Emma Wilson',
      issue_date: '2024-01-22',
      due_date: '2024-02-22',
      subtotal: 380.00,
      tax_amount: 0,
      total_amount: 380.00,
      amount_paid: 380.00,
      status: 'paid',
      payment_date: '2024-01-25',
      payment_method: 'Cash',
      payment_reference: 'CASH-001',
      notes: ''
    }
  ])

  // Mock customers for lookup
  const customers = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '01594 123456',
      postcode: 'GL16 8BE',
      address_line1: '123 High Street',
      city: 'Coleford',
      county: 'Gloucestershire',
      customer_type: 'residential',
      created_at: '2023-01-15',
      notes: 'Prefers morning deliveries'
    },
    {
      id: '2',
      name: 'Green Valley Farm',
      email: 'info@greenvalley.com',
      phone: '01594 789012',
      postcode: 'GL15 6HN',
      address_line1: 'Green Valley Road',
      city: 'Lydney',
      county: 'Gloucestershire',
      customer_type: 'farm',
      created_at: '2022-11-20',
      notes: 'Large farm - requires red diesel monthly'
    }
  ]

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setIsViewModalOpen(true)
  }

  const handleViewCustomer = (customerId) => {
    const customer = customers.find(c => c.id === customerId)
    if (customer) {
      setSelectedCustomer(customer)
      setIsCustomerModalOpen(true)
    }
  }

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setIsEditModalOpen(true)
  }

  const handleAddInvoice = (newInvoice) => {
    setInvoices([newInvoice, ...invoices])
  }

  const handleSaveInvoice = (updatedInvoice) => {
    setInvoices(invoices.map(inv =>
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    ))

    // TODO: Update in Supabase
  }

  const handleMarkAsPaid = (invoiceId, paymentData) => {
    setInvoices(invoices.map(inv =>
      inv.id === invoiceId
        ? {
            ...inv,
            status: 'paid',
            amount_paid: inv.total_amount,
            payment_date: new Date().toISOString().split('T')[0],
            payment_method: paymentData.payment_method,
            payment_reference: paymentData.payment_reference
          }
        : inv
    ))

    // TODO: Update in Supabase
  }

  const handleCancelInvoice = (invoiceId) => {
    if (window.confirm('Are you sure you want to cancel this invoice?')) {
      setInvoices(invoices.map(inv =>
        inv.id === invoiceId ? { ...inv, status: 'cancelled' } : inv
      ))

      // TODO: Update in Supabase
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'paid': 'bg-green-100 text-green-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'overdue': 'bg-red-100 text-red-700',
      'cancelled': 'bg-gray-100 text-gray-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const filteredInvoices = invoices.filter(invoice => {
    // Status filter
    if (filterStatus !== 'all' && invoice.status !== filterStatus) return false

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        invoice.invoice_number.toLowerCase().includes(query) ||
        invoice.customer_name.toLowerCase().includes(query)
      )
    }

    return true
  })

  const columns = [
    {
      header: 'Invoice #',
      accessor: 'invoice_number',
      render: (row) => (
        <div>
          <p className="font-mono font-semibold text-gray-900">{row.invoice_number}</p>
          <p className="text-xs text-gray-500">
            {new Date(row.issue_date).toLocaleDateString('en-GB')}
          </p>
        </div>
      )
    },
    {
      header: 'Customer',
      accessor: 'customer_name',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleViewCustomer(row.customer_id)
          }}
          className="text-left hover:text-[#2a4f8e] transition-colors"
        >
          <p className="font-semibold text-gray-900 hover:underline">{row.customer_name}</p>
        </button>
      )
    },
    {
      header: 'Amount',
      accessor: 'total_amount',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">£{row.total_amount.toFixed(2)}</p>
          {row.amount_paid > 0 && row.status !== 'paid' && (
            <p className="text-xs text-gray-500">£{row.amount_paid.toFixed(2)} paid</p>
          )}
        </div>
      )
    },
    {
      header: 'Due Date',
      accessor: 'due_date',
      render: (row) => {
        const dueDate = new Date(row.due_date)
        const today = new Date()
        const isOverdue = dueDate < today && row.status !== 'paid' && row.status !== 'cancelled'

        return (
          <span className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
            {dueDate.toLocaleDateString('en-GB')}
          </span>
        )
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(row.status)}`}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
          {row.status !== 'paid' && row.status !== 'cancelled' && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                const paymentMethod = window.prompt('Payment method (Cash/Bank Transfer/Card):')
                const paymentReference = window.prompt('Payment reference:')
                if (paymentMethod) {
                  handleMarkAsPaid(row.id, { payment_method: paymentMethod, payment_reference: paymentReference || '' })
                }
              }}
              className="p-1.5 hover:bg-green-100 rounded-lg transition-colors group"
              title="Mark as Paid"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
        </div>
      )
    }
  ]

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    overdue: invoices.filter(i => i.status === 'overdue').length,
    totalRevenue: invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount_paid, 0),
    outstanding: invoices.filter(i => i.status !== 'paid' && i.status !== 'cancelled').reduce((sum, inv) => sum + (inv.total_amount - inv.amount_paid), 0)
  }

  return (
    <div>
      <PageHeader
        title="Invoices"
        subtitle="Manage invoices and payments"
        action={
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Invoice
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Invoices', value: stats.total, key: 'all', color: 'text-gray-900' },
          { label: 'Paid', value: stats.paid, key: 'paid', color: 'text-green-600' },
          { label: 'Pending', value: stats.pending, key: 'pending', color: 'text-yellow-600' },
          { label: 'Overdue', value: stats.overdue, key: 'overdue', color: 'text-red-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              className={`cursor-pointer ${filterStatus === stat.key ? 'ring-2 ring-[#2a4f8e]' : ''}`}
              onClick={() => setFilterStatus(stat.key)}
            >
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">£{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Outstanding</p>
              <p className="text-3xl font-bold text-orange-600">£{stats.outstanding.toFixed(2)}</p>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by invoice number or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                />
              </div>
            </div>
            {(filterStatus !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setFilterStatus('all')
                  setSearchQuery('')
                }}
                className="px-4 py-2 text-sm text-[#2a4f8e] hover:text-[#1e3a6b] font-semibold whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {filterStatus === 'all' ? 'All Invoices' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Invoices`}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'}
              </p>
            </div>
          </div>

          {filteredInvoices.length > 0 ? (
            <Table
              columns={columns}
              data={filteredInvoices}
              onRowClick={handleViewInvoice}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try a different search term' : 'No invoices match the selected filters'}
              </p>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Modals */}
      <NewInvoiceModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAdd={handleAddInvoice}
      />

      <ViewInvoiceModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedInvoice(null)
        }}
        invoice={selectedInvoice}
        onEdit={handleEditInvoice}
        onCancel={handleCancelInvoice}
        onMarkAsPaid={handleMarkAsPaid}
      />

      <EditInvoiceModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedInvoice(null)
        }}
        invoice={selectedInvoice}
        onSave={handleSaveInvoice}
      />

      <ViewCustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => {
          setIsCustomerModalOpen(false)
          setSelectedCustomer(null)
        }}
        customer={selectedCustomer}
        onEdit={() => {}}
        onDelete={() => {}}
        onBookDelivery={() => {}}
        onCreateInvoice={() => {}}
      />
    </div>
  )
}

export default ViewInvoices
