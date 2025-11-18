import React from 'react'
import PageHeader from '../shared/PageHeader'
import Card from '../shared/Card'

const NewCustomer = () => {
  return (
    <div>
      <PageHeader
        title="New Customer"
        subtitle="Add a new customer to the database"
      />

      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">New Customer Form</h3>
          <p className="text-gray-600">This page will contain a form to add new customers.</p>
        </div>
      </Card>
    </div>
  )
}

export default NewCustomer
