import React from 'react'
import { motion } from 'motion/react'
import Card from '../shared/Card'
import Table from '../shared/Table'

const TopCustomersTable = () => {
  // Mock data - replace with real data from API/Supabase
  const customers = [
    {
      rank: 1,
      name: 'Green Valley Estate',
      deliveries: 24,
      totalLitres: '12,500L',
      lastDelivery: '2024-01-15'
    },
    {
      rank: 2,
      name: 'Smith Farm',
      deliveries: 18,
      totalLitres: '9,200L',
      lastDelivery: '2024-01-12'
    },
    {
      rank: 3,
      name: 'Brown & Co',
      deliveries: 15,
      totalLitres: '7,800L',
      lastDelivery: '2024-01-18'
    },
    {
      rank: 4,
      name: 'Williams Farm',
      deliveries: 12,
      totalLitres: '6,100L',
      lastDelivery: '2024-01-10'
    },
    {
      rank: 5,
      name: 'Johnson Residence',
      deliveries: 10,
      totalLitres: '4,500L',
      lastDelivery: '2024-01-14'
    }
  ]

  const columns = [
    {
      header: 'Rank',
      accessor: 'rank',
      render: (row) => (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#2a4f8e] to-[#264B8C] text-white font-bold text-sm">
          {row.rank}
        </div>
      )
    },
    {
      header: 'Customer',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">Last: {row.lastDelivery}</p>
        </div>
      )
    },
    {
      header: 'Deliveries',
      accessor: 'deliveries',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{row.deliveries}</span>
          <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(row.deliveries / 24) * 100}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Total Litres',
      accessor: 'totalLitres',
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.totalLitres}</span>
      )
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Top Customers</h3>
            <p className="text-sm text-gray-600 mt-1">Ranked by number of deliveries</p>
          </div>
          <button className="px-4 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors text-sm font-semibold">
            View All
          </button>
        </div>

        <Table
          columns={columns}
          data={customers}
          onRowClick={(row) => console.log('Customer clicked:', row)}
        />
      </Card>
    </motion.div>
  )
}

export default TopCustomersTable
