import React from 'react'
import PageHeader from '../shared/PageHeader'
import Card from '../shared/Card'

const NewInvoice = () => {
  return (
    <div>
      <PageHeader
        title="New Invoice"
        subtitle="Create a new invoice"
      />

      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">New Invoice Form</h3>
          <p className="text-gray-600">This page will contain a form to create new invoices.</p>
        </div>
      </Card>
    </div>
  )
}

export default NewInvoice
