import React from 'react'
import { Link } from 'react-router-dom'

const EnquiryConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900 text-center mb-3">
            Thank You!
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6">
            We've received your enquiry and will get back to you shortly. One of our team members will contact you soon.
          </p>

          {/* Account Setup CTA */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700 text-center mb-3">
              Want to track your deliveries and manage your account online?
            </p>
            <Link
              to="/admin/login"
              className="block w-full py-2.5 px-4 bg-gradient-to-r from-[#2a4f8e] to-[#264B8C] text-white rounded-lg font-semibold text-center hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              onClick={onClose}
            >
              Setup Your Account
            </Link>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Close
          </button>

          {/* Close X button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default EnquiryConfirmationModal
