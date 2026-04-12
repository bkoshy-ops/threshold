import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Tenant from './pages/Tenant'
import Landlord from './pages/Landlord'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/landlord" element={<Landlord />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
