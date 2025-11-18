import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const EditTankModal = ({ isOpen, onClose, onSave, tank }) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    volume: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
      diameter: ''
    },
    footprint: '',
    features: [''],
    image_url: ''
  })

  useEffect(() => {
    if (tank) {
      setFormData({
        name: tank.name || '',
        model: tank.model || '',
        volume: tank.volume || '',
        weight: tank.weight || '',
        dimensions: {
          length: tank.dimensions?.length || '',
          width: tank.dimensions?.width || '',
          height: tank.dimensions?.height || '',
          diameter: tank.dimensions?.diameter || ''
        },
        footprint: tank.footprint || '',
        features: tank.features && tank.features.length > 0 ? tank.features : [''],
        image_url: tank.image_url || ''
      })
    }
  }, [tank])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Filter out empty features
    const filteredFeatures = formData.features.filter(f => f.trim() !== '')

    const updatedTank = {
      ...tank,
      ...formData,
      features: filteredFeatures,
      // Remove empty dimension fields
      dimensions: Object.fromEntries(
        Object.entries(formData.dimensions).filter(([_, v]) => v.trim() !== '')
      )
    }

    onSave?.(updatedTank)
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleDimensionChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      dimensions: {
        ...formData.dimensions,
        [name]: value
      }
    })
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({
      ...formData,
      features: newFeatures
    })
  }

  const addFeatureField = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    })
  }

  const removeFeatureField = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      features: newFeatures.length > 0 ? newFeatures : ['']
    })
  }

  if (!tank) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Edit Oil Tank</h2>
                  <p className="text-sm text-gray-600 mt-1">Update oil tank product information</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                <div className="overflow-y-auto flex-1 p-6">
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tank Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., 1235 Litre Slimline Bunded Oil Tank"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Model *
                          </label>
                          <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., Deso SL1250BT"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Volume *
                          </label>
                          <input
                            type="text"
                            name="volume"
                            value={formData.volume}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., 1235ltr"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Weight *
                          </label>
                          <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., 155.000kg"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Footprint *
                          </label>
                          <input
                            type="text"
                            name="footprint"
                            value={formData.footprint}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., 1860mm x 600mm or Diameter: 1230mm"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dimensions */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-4">Dimensions (Optional - Fill applicable fields)</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Length
                          </label>
                          <input
                            type="text"
                            name="length"
                            value={formData.dimensions.length}
                            onChange={handleDimensionChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., 2000mm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Width
                          </label>
                          <input
                            type="text"
                            name="width"
                            value={formData.dimensions.width}
                            onChange={handleDimensionChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., 650mm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Height
                          </label>
                          <input
                            type="text"
                            name="height"
                            value={formData.dimensions.height}
                            onChange={handleDimensionChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., 1660mm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Diameter
                          </label>
                          <input
                            type="text"
                            name="diameter"
                            value={formData.dimensions.diameter}
                            onChange={handleDimensionChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                            placeholder="e.g., 1250mm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-700">Features</h3>
                        <button
                          type="button"
                          onClick={addFeatureField}
                          className="text-sm text-[#2a4f8e] hover:text-[#1e3a6b] font-semibold flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Feature
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.features.map((feature, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleFeatureChange(index, e.target.value)}
                              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                              placeholder={`Feature ${index + 1}`}
                            />
                            {formData.features.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFeatureField(index)}
                                className="p-3 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2a4f8e] focus:ring-2 focus:ring-[#2a4f8e]/20 outline-none transition-all"
                        placeholder="https://example.com/tank-image.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave empty to use placeholder image</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2a4f8e] to-[#264B8C] text-white font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EditTankModal
