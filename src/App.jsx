import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import FuelCardsPage from './pages/FuelCardsPage'
import OilsLubricantsPage from './pages/OilsLubricantsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Element 2: Company Logo */}
        <Header />

        {/* Main Content Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fuel-cards" element={<FuelCardsPage />} />
          <Route path="/oils-lubricants" element={<OilsLubricantsPage />} />
        </Routes>

        {/* Element 11: Contact Information / Legal Pages */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
