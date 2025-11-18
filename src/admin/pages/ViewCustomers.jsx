import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import PageHeader from '../shared/PageHeader'
import Card from '../shared/Card'
import Table from '../shared/Table'
import AddCustomerModal from '../components/AddCustomerModal'
import ViewCustomerModal from '../components/ViewCustomerModal'
import EditCustomerModal from '../components/EditCustomerModal'
import AddDeliveryModal from '../components/AddDeliveryModal'
import { supabase } from '../../lib/supabase'

const ViewCustomers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch customers from Supabase on component mount
  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCustomers(data || [])
    } catch (err) {
      console.error('Error fetching customers:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCustomer = async (newCustomer) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([newCustomer])
        .select()

      if (error) throw error

      // Refresh the customers list
      await fetchCustomers()
    } catch (err) {
      console.error('Error adding customer:', err)
      alert('Failed to add customer: ' + err.message)
    }
  }

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    setIsViewModalOpen(true)
  }

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const { error } = await supabase
          .from('customers')
          .delete()
          .eq('id', customerId)

        if (error) throw error

        // Refresh the customers list
        await fetchCustomers()
      } catch (err) {
        console.error('Error deleting customer:', err)
        alert('Failed to delete customer: ' + err.message)
      }
    }
  }

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer)
    setIsEditModalOpen(true)
  }

  const handleSaveCustomer = async (updatedCustomer) => {
    try {
      const { error } = await supabase
        .from('customers')
        .update(updatedCustomer)
        .eq('id', updatedCustomer.id)

      if (error) throw error

      // Refresh the customers list
      await fetchCustomers()
    } catch (err) {
      console.error('Error updating customer:', err)
      alert('Failed to update customer: ' + err.message)
    }
  }

  const handleBookDelivery = (customer) => {
    setSelectedCustomer(customer)
    setIsDeliveryModalOpen(true)
  }

  const handleCreateInvoice = (customer) => {
    console.log('Create invoice for:', customer)
    // TODO: Navigate to create invoice page or open modal
  }

  const getTypeLabel = (type) => {
    const labels = {
      'residential': 'Residential',
      'farm': 'Farm',
      'commercial': 'Commercial'
    }
    return labels[type] || type
  }

  const getTypeColor = (type) => {
    const colors = {
      'residential': 'bg-blue-100 text-blue-700',
      'farm': 'bg-green-100 text-green-700',
      'commercial': 'bg-purple-100 text-purple-700'
    }
    return colors[type] || 'bg-gray-100 text-gray-700'
  }

  const filteredCustomers = customers.filter(customer => {
    // Type filter
    if (filterType !== 'all' && customer.customer_type !== filterType) return false

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.email?.toLowerCase().includes(query) ||
        customer.phone?.includes(query) ||
        customer.postcode?.toLowerCase().includes(query) ||
        customer.city?.toLowerCase().includes(query)
      )
    }

    return true
  })

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.email || 'No email'}</p>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'phone',
      render: (row) => (
        <div>
          <p className="text-sm text-gray-900">{row.phone}</p>
          <p className="text-xs text-gray-500">{row.postcode}</p>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'city',
      render: (row) => (
        <div>
          <p className="text-sm text-gray-900">{row.city}</p>
          {row.county && <p className="text-xs text-gray-500">{row.county}</p>}
        </div>
      )
    },
    {
      header: 'Type',
      accessor: 'customer_type',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getTypeColor(row.customer_type)}`}>
          {getTypeLabel(row.customer_type)}
        </span>
      )
    },
    {
      header: 'Customer Since',
      accessor: 'created_at',
      render: (row) => (
        <span className="text-sm text-gray-600">
          {new Date(row.created_at).toLocaleDateString('en-GB')}
        </span>
      )
    }
  ]

  const stats = {
    total: customers.length,
    residential: customers.filter(c => c.customer_type === 'residential').length,
    farm: customers.filter(c => c.customer_type === 'farm').length,
    commercial: customers.filter(c => c.customer_type === 'commercial').length
  }

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle="Manage your customer database"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Customer
          </button>
        }
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2a4f8e]"></div>
          <p className="mt-4 text-gray-600">Loading customers...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error loading customers</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && !error && (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Customers', value: stats.total, key: 'all' },
          { label: 'Residential', value: stats.residential, key: 'residential' },
          { label: 'Farm', value: stats.farm, key: 'farm' },
          { label: 'Commercial', value: stats.commercial, key: 'commercial' }
        ].map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              className={`cursor-pointer ${filterType === stat.key ? 'ring-2 ring-[#2a4f8e]' : ''}`}
              onClick={() => setFilterType(stat.key)}
            >
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
                  placeholder="Search by name, email, phone, postcode, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                />
              </div>
            </div>
            {(filterType !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setFilterType('all')
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

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {filterType === 'all' ? 'All Customers' : `${getTypeLabel(filterType)} Customers`}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {filteredCustomers.length} {filteredCustomers.length === 1 ? 'customer' : 'customers'}
              </p>
            </div>
          </div>

          {filteredCustomers.length > 0 ? (
            <Table
              columns={columns}
              data={filteredCustomers}
              onRowClick={handleViewCustomer}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try a different search term' : 'No customers match the selected filters'}
              </p>
            </div>
          )}
        </Card>
      </motion.div>
      )}

      {/* Modals */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCustomer}
      />

      <ViewCustomerModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedCustomer(null)
        }}
        customer={selectedCustomer}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
        onBookDelivery={handleBookDelivery}
        onCreateInvoice={handleCreateInvoice}
      />

      <EditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedCustomer(null)
        }}
        customer={selectedCustomer}
        onSave={handleSaveCustomer}
      />

      <AddDeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => {
          setIsDeliveryModalOpen(false)
          setSelectedCustomer(null)
        }}
        onAdd={(delivery) => console.log('Delivery added:', delivery)}
        selectedDate={new Date().toISOString().split('T')[0]}
        existingDeliveries={[]}
        preselectedCustomer={selectedCustomer}
      />
    </div>
  )
}

export default ViewCustomers
