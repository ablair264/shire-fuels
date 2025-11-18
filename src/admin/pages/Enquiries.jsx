import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import PageHeader from '../shared/PageHeader'
import Card from '../shared/Card'
import Table from '../shared/Table'
import AddEnquiryModal from '../components/AddEnquiryModal'
import { supabase } from '../../lib/supabase'

const Enquiries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  // Fetch enquiries from Supabase on component mount
  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setEnquiries(data || [])
    } catch (err) {
      console.error('Error fetching enquiries:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEnquiry = async (newEnquiry) => {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([newEnquiry])
        .select()

      if (error) throw error

      // Refresh enquiries list
      await fetchEnquiries()
    } catch (err) {
      console.error('Error adding enquiry:', err)
      alert('Failed to add enquiry: ' + err.message)
    }
  }

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', enquiryId)

      if (error) throw error

      // Refresh enquiries list
      await fetchEnquiries()
    } catch (err) {
      console.error('Error updating enquiry status:', err)
      alert('Failed to update status: ' + err.message)
    }
  }

  const getServiceLabel = (service) => {
    const labels = {
      'heating-oil': 'Heating Oil',
      'red-diesel': 'Red Diesel',
      'fuel-cards': 'Fuel Cards',
      'oil-tanks': 'Oil Tanks',
      'other': 'Other'
    }
    return labels[service] || service
  }

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-700',
      'contacted': 'bg-yellow-100 text-yellow-700',
      'converted': 'bg-green-100 text-green-700',
      'lost': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const filteredEnquiries = filterStatus === 'all'
    ? enquiries
    : enquiries.filter(enq => enq.status === filterStatus)

  const columns = [
    {
      header: 'Date',
      accessor: 'date',
      render: (row) => (
        <span className="text-sm text-gray-600">{row.date}</span>
      )
    },
    {
      header: 'Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
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
      header: 'Service',
      accessor: 'service',
      render: (row) => (
        <span className="text-sm text-gray-900">{getServiceLabel(row.service)}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold outline-none cursor-pointer transition-colors ${getStatusColor(row.status)}`}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
      )
    },
    {
      header: 'Notes',
      accessor: 'notes',
      render: (row) => (
        <span className="text-sm text-gray-600 truncate max-w-xs block">
          {row.notes || '-'}
        </span>
      )
    }
  ]

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    converted: enquiries.filter(e => e.status === 'converted').length
  }

  return (
    <div>
      <PageHeader
        title="Enquiries"
        subtitle="Manage customer enquiries and requests"
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Enquiry
          </button>
        }
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2a4f8e]"></div>
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error loading enquiries</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      {!loading && !error && (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'blue', key: 'all' },
          { label: 'New', value: stats.new, color: 'blue', key: 'new' },
          { label: 'Contacted', value: stats.contacted, color: 'yellow', key: 'contacted' },
          { label: 'Converted', value: stats.converted, color: 'green', key: 'converted' }
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

      {/* Enquiries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {filterStatus === 'all' ? 'All Enquiries' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Enquiries`}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {filteredEnquiries.length} {filteredEnquiries.length === 1 ? 'enquiry' : 'enquiries'}
              </p>
            </div>
            {filterStatus !== 'all' && (
              <button
                onClick={() => setFilterStatus('all')}
                className="text-sm text-[#2a4f8e] hover:text-[#1e3a6b] font-semibold"
              >
                Clear Filter
              </button>
            )}
          </div>

          {filteredEnquiries.length > 0 ? (
            <Table
              columns={columns}
              data={filteredEnquiries}
              onRowClick={(row) => console.log('Enquiry clicked:', row)}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No enquiries found</h3>
              <p className="text-gray-600">
                {filterStatus === 'all'
                  ? 'No enquiries to display yet.'
                  : `No ${filterStatus} enquiries at the moment.`
                }
              </p>
            </div>
          )}
        </Card>
      </motion.div>
      )}

      {/* Add Enquiry Modal */}
      <AddEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEnquiry}
      />
    </div>
  )
}

export default Enquiries
