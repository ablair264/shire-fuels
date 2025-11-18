import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import PageHeader from '../shared/PageHeader'
import Card from '../shared/Card'
import Table from '../shared/Table'
import AddTankModal from '../components/AddTankModal'
import EditTankModal from '../components/EditTankModal'
import { supabase } from '../../lib/supabase'

const OilTanksManager = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTank, setSelectedTank] = useState(null)
  const [tanks, setTanks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch tanks from Supabase on component mount
  useEffect(() => {
    fetchTanks()
  }, [])

  const fetchTanks = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('oil_tank_products')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('name')

      if (error) throw error
      setTanks(data || [])
    } catch (err) {
      console.error('Error fetching tanks:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTank = async (newTank) => {
    try {
      const { data, error } = await supabase
        .from('oil_tank_products')
        .insert([{
          ...newTank,
          is_active: true
        }])
        .select()

      if (error) throw error

      // Refresh the tanks list
      await fetchTanks()
    } catch (err) {
      console.error('Error adding tank:', err)
      alert('Failed to add tank: ' + err.message)
    }
  }

  const handleEditTank = (tank) => {
    setSelectedTank(tank)
    setIsEditModalOpen(true)
  }

  const handleSaveTank = async (updatedTank) => {
    try {
      const { error } = await supabase
        .from('oil_tank_products')
        .update(updatedTank)
        .eq('id', updatedTank.id)

      if (error) throw error

      // Refresh the tanks list
      await fetchTanks()
    } catch (err) {
      console.error('Error updating tank:', err)
      alert('Failed to update tank: ' + err.message)
    }
  }

  const handleDeleteTank = async (tankId) => {
    if (window.confirm('Are you sure you want to delete this tank? It will be removed from the website.')) {
      try {
        const { error } = await supabase
          .from('oil_tank_products')
          .delete()
          .eq('id', tankId)

        if (error) throw error

        // Refresh the tanks list
        await fetchTanks()
      } catch (err) {
        console.error('Error deleting tank:', err)
        alert('Failed to delete tank: ' + err.message)
      }
    }
  }

  const handleToggleActive = async (tankId) => {
    try {
      const tank = tanks.find(t => t.id === tankId)
      const { error } = await supabase
        .from('oil_tank_products')
        .update({ is_active: !tank.is_active })
        .eq('id', tankId)

      if (error) throw error

      // Refresh the tanks list
      await fetchTanks()
    } catch (err) {
      console.error('Error toggling tank status:', err)
      alert('Failed to update tank status: ' + err.message)
    }
  }

  const columns = [
    {
      header: 'Tank Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.model}</p>
        </div>
      )
    },
    {
      header: 'Volume',
      accessor: 'volume',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.volume}</span>
      )
    },
    {
      header: 'Weight',
      accessor: 'weight',
      render: (row) => (
        <span className="text-sm text-gray-700">{row.weight}</span>
      )
    },
    {
      header: 'Footprint',
      accessor: 'footprint',
      render: (row) => (
        <span className="text-sm text-gray-700">{row.footprint}</span>
      )
    },
    {
      header: 'Features',
      accessor: 'features',
      render: (row) => (
        <span className="text-xs text-gray-600">{row.features.length} features</span>
      )
    },
    {
      header: 'Status',
      accessor: 'is_active',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleToggleActive(row.id)
          }}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.is_active
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors`}
        >
          {row.is_active ? 'Active' : 'Inactive'}
        </button>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteTank(row.id)
          }}
          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
          title="Delete Tank"
        >
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )
    }
  ]

  return (
    <div>
      <PageHeader
        title="Oil Tanks Manager"
        subtitle="Manage oil tank products displayed on the website"
        action={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Tank
          </button>
        }
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2a4f8e]"></div>
          <p className="mt-4 text-gray-600">Loading tanks...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error loading tanks</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Stats */}
      {!loading && !error && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Tanks</p>
              <p className="text-3xl font-bold text-gray-900">{tanks.length}</p>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-green-600">
                {tanks.filter(t => t.is_active).length}
              </p>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Inactive</p>
              <p className="text-3xl font-bold text-gray-600">
                {tanks.filter(t => !t.is_active).length}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
      )}

      {/* Tanks Table */}
      {!loading && !error && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Oil Tank Products</h3>
              <p className="text-sm text-gray-600 mt-1">
                {tanks.length} {tanks.length === 1 ? 'tank' : 'tanks'} in catalog
              </p>
            </div>
          </div>

          {tanks.length > 0 ? (
            <Table
              columns={columns}
              data={tanks}
              onRowClick={handleEditTank}
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tanks yet</h3>
              <p className="text-gray-600 mb-4">Add your first oil tank product to display on the website</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors font-semibold"
              >
                Add Tank
              </button>
            </div>
          )}
        </Card>
      </motion.div>
      )}

      {/* Modals */}
      <AddTankModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTank}
      />

      <EditTankModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedTank(null)
        }}
        tank={selectedTank}
        onSave={handleSaveTank}
      />
    </div>
  )
}

export default OilTanksManager
