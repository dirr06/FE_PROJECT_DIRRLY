import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './page/Home.jsx'
import Navbar from './component/Navbar.jsx'
import Booking from './page/Booking.jsx'
import Tickets from './page/Tickets.jsx'
import Flights from './page/Flights.jsx'
import Login from './page/Login'
import Register from './page/Register'
import ProtectedRoute from './component/ProtectedRoute.jsx'

const App = () => {
  return (
    <div>
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/FE_PROJECT_DIRRLY/login" element={<Login/>}/>
      <Route path="/FE_PROJECT_DIRRLY/register" element={<Register/>}/>
      <Route path="/FE_PROJECT_DIRRLY" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/FE_PROJECT_DIRRLY/booking" element={<ProtectedRoute><Booking/></ProtectedRoute>}/>
      <Route path="/FE_PROJECT_DIRRLY/tickets" element={<ProtectedRoute><Tickets/></ProtectedRoute>}/>
      <Route path="/FE_PROJECT_DIRRLY/flights" element={<ProtectedRoute><Flights/></ProtectedRoute>}/>
    </Routes>
    </Router>
    </div>
  )
}

export default App