import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import PageHeader from '../shared/PageHeader'
import Card from '../shared/Card'
import Table from '../shared/Table'
import AddDeliveryModal from '../components/AddDeliveryModal'
import { supabase } from '../../lib/supabase'

const DeliveriesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDateRange, setFilterDateRange] = useState('all')

  // Fetch deliveries from Supabase on component mount
  useEffect(() => {
    fetchDeliveries()
  }, [])

  const fetchDeliveries = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('deliveries')
        .select('*, customers(name)')
        .order('delivery_date', { ascending: false })

      if (error) throw error

      // Map the data to include customer_name from the joined customers table
      const formattedData = data?.map(delivery => ({
        ...delivery,
        customer_name: delivery.customers?.name || 'Unknown Customer'
      })) || []

      setDeliveries(formattedData)
    } catch (err) {
      console.error('Error fetching deliveries:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDelivery = async (newDelivery) => {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .insert([newDelivery])
        .select()

      if (error) throw error

      // Refresh deliveries list
      await fetchDeliveries()
    } catch (err) {
      console.error('Error adding delivery:', err)
      alert('Failed to add delivery: ' + err.message)
    }
  }

  const handleMarkAsCompleted = async (deliveryId) => {
    try {
      const { error } = await supabase
        .from('deliveries')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', deliveryId)

      if (error) throw error

      // Refresh deliveries list
      await fetchDeliveries()
    } catch (err) {
      console.error('Error marking delivery as completed:', err)
      alert('Failed to update delivery: ' + err.message)
    }
  }

  const handleGenerateInvoice = (delivery) => {
    // TODO: Create invoice in Supabase and navigate to invoice page
    console.log('Generating invoice for delivery:', delivery)

    // const { data, error } = await supabase
    //   .from('invoices')
    //   .insert([{
    //     customer_id: delivery.customer_id,
    //     delivery_id: delivery.id,
    //     issue_date: new Date().toISOString(),
    //     due_date: new Date(Date.now() + 30*24*60*60*1000).toISOString(), // 30 days
    //     subtotal: delivery.total_price,
    //     tax_amount: 0,
    //     total_amount: delivery.total_price,
    //     status: 'pending'
    //   }])

    alert(`Invoice generated for ${delivery.customer_name} - £${delivery.total_price}`)
  }

  const getProductLabel = (product) => {
    const labels = {
      'heating-oil': 'Heating Oil',
      'red-diesel': 'Red Diesel'
    }
    return labels[product] || product
  }

  const getStatusColor = (status) => {
    const colors = {
      'scheduled': 'bg-blue-100 text-blue-700',
      'in-progress': 'bg-yellow-100 text-yellow-700',
      'completed': 'bg-green-100 text-green-700',
      'cancelled': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const filteredDeliveries = deliveries.filter(delivery => {
    if (filterStatus !== 'all' && delivery.status !== filterStatus) return false

    if (filterDateRange !== 'all') {
      const deliveryDate = new Date(delivery.delivery_date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (filterDateRange === 'today' && deliveryDate.toDateString() !== today.toDateString()) return false
      if (filterDateRange === 'week') {
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        if (deliveryDate < today || deliveryDate > weekFromNow) return false
      }
      if (filterDateRange === 'month') {
        const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
        if (deliveryDate < today || deliveryDate > monthFromNow) return false
      }
    }

    return true
  })

  const columns = [
    {
      header: 'Date & Time',
      accessor: 'delivery_date',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">
            {new Date(row.delivery_date).toLocaleDateString('en-GB')}
          </p>
          <p className="text-xs text-gray-500">{row.delivery_time_slot}</p>
        </div>
      )
    },
    {
      header: 'Customer',
      accessor: 'customer_name',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.customer_name}</p>
          <p className="text-xs text-gray-500">{row.postcode}</p>
        </div>
      )
    },
    {
      header: 'Product',
      accessor: 'product',
      render: (row) => (
        <span className="text-sm text-gray-900">{getProductLabel(row.product)}</span>
      )
    },
    {
      header: 'Quantity',
      accessor: 'quantity_litres',
      render: (row) => (
        <span className="text-sm text-gray-900">{row.quantity_litres}L</span>
      )
    },
    {
      header: 'Total',
      accessor: 'total_price',
      render: (row) => (
        <span className="text-sm font-semibold text-gray-900">£{row.total_price.toFixed(2)}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(row.status)}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.status !== 'completed' && row.status !== 'cancelled' && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleMarkAsCompleted(row.id)
              }}
              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Mark as completed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
          {row.status === 'completed' && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleGenerateInvoice(row)
              }}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Generate invoice"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          )}
        </div>
      )
    }
  ]

  const stats = {
    total: deliveries.length,
    scheduled: deliveries.filter(d => d.status === 'scheduled').length,
    inProgress: deliveries.filter(d => d.status === 'in-progress').length,
    completed: deliveries.filter(d => d.status === 'completed').length
  }

  return (
    <div>
      <PageHeader
        title="Deliveries List"
        subtitle="View and manage all deliveries"
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Delivery
          </button>
        }
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2a4f8e]"></div>
          <p className="mt-4 text-gray-600">Loading deliveries...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error loading deliveries</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && !error && (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, key: 'all' },
          { label: 'Scheduled', value: stats.scheduled, key: 'scheduled' },
          { label: 'In Progress', value: stats.inProgress, key: 'in-progress' },
          { label: 'Completed', value: stats.completed, key: 'completed' }
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
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mr-2">Date Range:</label>
              <select
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Next 7 Days</option>
                <option value="month">Next 30 Days</option>
              </select>
            </div>
            {(filterStatus !== 'all' || filterDateRange !== 'all') && (
              <button
                onClick={() => {
                  setFilterStatus('all')
                  setFilterDateRange('all')
                }}
                className="text-sm text-[#2a4f8e] hover:text-[#1e3a6b] font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Deliveries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {filterStatus === 'all' ? 'All Deliveries' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Deliveries`}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {filteredDeliveries.length} {filteredDeliveries.length === 1 ? 'delivery' : 'deliveries'}
              </p>
            </div>
          </div>

          {filteredDeliveries.length > 0 ? (
            <Table
              columns={columns}
              data={filteredDeliveries}
              onRowClick={(row) => console.log('Delivery clicked:', row)}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No deliveries found</h3>
              <p className="text-gray-600">No deliveries match the selected filters.</p>
            </div>
          )}
        </Card>
      </motion.div>
      )}

      {/* Add Delivery Modal */}
      <AddDeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDelivery}
        selectedDate={new Date().toISOString().split('T')[0]}
        existingDeliveries={deliveries}
      />
    </div>
  )
}

export default DeliveriesList
