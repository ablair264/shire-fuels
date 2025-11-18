import React, { useState } from 'react'
import PageHeader from '../shared/PageHeader'
import Calendar from '../components/Calendar'
import AddDeliveryModal from '../components/AddDeliveryModal'

const DeliveryCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [deliveries, setDeliveries] = useState([
    // Mock data - replace with Supabase query
    {
      id: 1,
      customer_id: '1',
      customer_name: 'John Smith',
      delivery_date: '2024-01-19',
      delivery_time_slot: '09:00 - 09:30',
      product: 'heating-oil',
      quantity_litres: 500,
      status: 'scheduled',
      postcode: 'GL16 8BE',
      address_line1: '123 High Street'
    },
    {
      id: 2,
      customer_name: 'Green Valley Farm',
      delivery_date: '2024-01-19',
      delivery_time_slot: '11:00 - 11:30',
      product: 'red-diesel',
      quantity_litres: 1000,
      status: 'scheduled',
      postcode: 'GL15 6HN'
    },
    {
      id: 3,
      customer_name: 'Brown & Co',
      delivery_date: '2024-01-20',
      delivery_time_slot: '10:00 - 10:30',
      product: 'heating-oil',
      quantity_litres: 750,
      status: 'in-progress',
      postcode: 'GL16 7JK'
    }
  ])

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split('T')[0])
    setIsModalOpen(true)
  }

  const handleDeliveryClick = (delivery) => {
    console.log('Delivery clicked:', delivery)
    // TODO: Open delivery details modal
  }

  const handleAddDelivery = (newDelivery) => {
    setDeliveries([...deliveries, newDelivery])

    // TODO: Save to Supabase
    // const { data, error } = await supabase
    //   .from('deliveries')
    //   .insert([newDelivery])
  }

  return (
    <div>
      <PageHeader
        title="Delivery Calendar"
        subtitle="View and manage delivery schedules"
        action={
          <button
            onClick={() => {
              setSelectedDate(new Date().toISOString().split('T')[0])
              setIsModalOpen(true)
            }}
            className="px-4 py-2 bg-[#2a4f8e] text-white rounded-xl hover:bg-[#1e3a6b] transition-colors font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Delivery
          </button>
        }
      />

      <Calendar
        deliveries={deliveries}
        onDateClick={handleDateClick}
        onDeliveryClick={handleDeliveryClick}
      />

      <AddDeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDelivery}
        selectedDate={selectedDate}
        existingDeliveries={deliveries}
      />
    </div>
  )
}

export default DeliveryCalendar
