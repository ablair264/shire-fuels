import React from 'react'
import { motion } from 'motion/react'
import Card from '../shared/Card'
import Table from '../shared/Table'

const OutstandingInvoicesTable = () => {
  // Mock data - replace with real data from API/Supabase
  const invoices = [
    {
      id: 'INV-001',
      customer: 'Smith Farm',
      amount: '£450.00',
      dueDate: '2024-01-15',
      status: 'overdue',
      days: 5
    },
    {
      id: 'INV-002',
      customer: 'Green Valley Estate',
      amount: '£1,200.00',
      dueDate: '2024-01-20',
      status: 'pending',
      days: 0
    },
    {
      id: 'INV-003',
      customer: 'Johnson Residence',
      amount: '£325.00',
      dueDate: '2024-01-18',
      status: 'pending',
      days: 0
    },
    {
      id: 'INV-004',
      customer: 'Brown & Co',
      amount: '£890.00',
      dueDate: '2024-01-10',
      status: 'overdue',
      days: 10
    },
    {
      id: 'INV-005',
      customer: 'Williams Farm',
      amount: '£675.00',
      dueDate: '2024-01-25',
      status: 'pending',
      days: 0
    }
  ]

  const columns = [
    {
      header: 'Invoice',
      accessor: 'id',
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.id}</span>
      )
    },
    {
      header: 'Customer',
      accessor: 'customer'
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.amount}</span>
      )
    },
    {
      header: 'Due Date',
      accessor: 'dueDate'
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={`
            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
            ${row.status === 'overdue'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
            }
          `}
        >
          {row.status === 'overdue' && (
            <span className="mr-1">⚠️</span>
          )}
          {row.status === 'overdue' ? `${row.days} days overdue` : 'Pending'}
        </span>
      )
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Outstanding Invoices</h3>
            <p className="text-sm text-gray-600 mt-1">Invoices pending payment</p>
          </div>
          <button className="px-4 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors text-sm font-semibold">
            View All
          </button>
        </div>

        <Table
          columns={columns}
          data={invoices}
          onRowClick={(row) => console.log('Invoice clicked:', row)}
        />
      </Card>
    </motion.div>
  )
}

export default OutstandingInvoicesTable
