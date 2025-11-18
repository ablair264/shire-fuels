import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import FuelCardsPage from './pages/FuelCardsPage'
import OilsLubricantsPage from './pages/OilsLubricantsPage'
import OilTanksPage from './pages/OilTanksPage'

// Admin imports
import Login from './admin/pages/Login'
import AdminLayout from './admin/components/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import Enquiries from './admin/pages/Enquiries'
import DeliveryCalendar from './admin/pages/DeliveryCalendar'
import DeliveriesList from './admin/pages/DeliveriesList'
import NewDelivery from './admin/pages/NewDelivery'
import ViewCustomers from './admin/pages/ViewCustomers'
import NewCustomer from './admin/pages/NewCustomer'
import CustomerMap from './admin/pages/CustomerMap'
import ViewInvoices from './admin/pages/ViewInvoices'
import NewInvoice from './admin/pages/NewInvoice'
import OilTanksManager from './admin/pages/OilTanksManager'
import Settings from './admin/pages/Settings'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="min-h-screen">
            <Header />
            <HomePage />
            <Footer />
          </div>
        } />
        <Route path="/fuel-cards" element={
          <div className="min-h-screen">
            <Header />
            <FuelCardsPage />
            <Footer />
          </div>
        } />
        <Route path="/oils-lubricants" element={
          <div className="min-h-screen">
            <Header />
            <OilsLubricantsPage />
            <Footer />
          </div>
        } />
        <Route path="/oil-tanks" element={
          <div className="min-h-screen">
            <Header />
            <OilTanksPage />
            <Footer />
          </div>
        } />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="deliveries/calendar" element={<DeliveryCalendar />} />
          <Route path="deliveries/list" element={<DeliveriesList />} />
          <Route path="deliveries/new" element={<NewDelivery />} />
          <Route path="customers/view" element={<ViewCustomers />} />
          <Route path="customers/new" element={<NewCustomer />} />
          <Route path="customers/map" element={<CustomerMap />} />
          <Route path="invoices/view" element={<ViewInvoices />} />
          <Route path="invoices/new" element={<NewInvoice />} />
          <Route path="oil-tanks" element={<OilTanksManager />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
