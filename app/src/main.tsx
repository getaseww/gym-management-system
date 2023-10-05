import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Attendance from './pages/dashboard/attendance'
import Equipment from './pages/dashboard/equipment'
import EquipmentCategory from './pages/dashboard/equipmentCategory'
import FitnessClass from './pages/dashboard/fitnessClass'
import Payment from './pages/dashboard/payment'
import MembershipPlan from './pages/dashboard/membershipPlan'
import Inventory from './pages/dashboard/inventory'
import Instructor from './pages/dashboard/instructor'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/attendance' element={<Attendance />} />
          <Route path='/dashboard/equipment' element={<Equipment />} />
          <Route path='/dashboard/equipment-category' element={<EquipmentCategory />} />
          <Route path='/dashboard/fitness-class' element={<FitnessClass />} />
          <Route path='/dashboard/payment' element={<Payment />} />
          <Route path='/dashboard/membership-plan' element={<MembershipPlan />} />
          <Route path='/dashboard/inventory' element={<Inventory />} />
          <Route path='/dashboard/instructor' element={<Instructor />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
