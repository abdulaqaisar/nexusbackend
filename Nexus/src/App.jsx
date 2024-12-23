import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from './utils/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Application from './pages/Application';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/application' element={<Application/>} />
          <Route path='/student-dashboard' element={<Dashboard/>} />
          {/* Admin Routes */}
          <Route path='/admin-dashboard' element={ 
                                                      <AdminDashboard/>
                                                    } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
