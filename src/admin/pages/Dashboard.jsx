import React from 'react'
import PageHeader from '../shared/PageHeader'
import MetricCard from '../components/MetricCard'
import OutstandingInvoicesTable from '../components/OutstandingInvoicesTable'
import TopCustomersTable from '../components/TopCustomersTable'

const Dashboard = () => {
  // Mock data - replace with real data from API/Supabase
  const metrics = {
    deliveriesToday: 8,
    deliveriesThisWeek: 42,
    litresThisMonth: 45680
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening today."
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Deliveries Today"
          value={metrics.deliveriesToday}
          color="blue"
          delay={0}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          }
          trend={{
            direction: 'up',
            value: '+12%',
            label: 'vs yesterday'
          }}
        />

        <MetricCard
          title="Deliveries This Week"
          value={metrics.deliveriesThisWeek}
          color="green"
          delay={0.1}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          trend={{
            direction: 'up',
            value: '+8%',
            label: 'vs last week'
          }}
        />

        <MetricCard
          title="Litres This Month"
          value={metrics.litresThisMonth.toLocaleString()}
          color="purple"
          delay={0.2}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          }
          trend={{
            direction: 'up',
            value: '+15%',
            label: 'vs last month'
          }}
        />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OutstandingInvoicesTable />
        <TopCustomersTable />
      </div>
    </div>
  )
}

export default Dashboard
