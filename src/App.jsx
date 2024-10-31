import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './page/Home.jsx'
import Navbar from './component/Navbar.jsx'
import Booking from './page/Booking.jsx'
import Tickets from './page/Tickets.jsx'
import Flights from './page/Flights.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/tickets" element={<Tickets/>}/>
      <Route path="/flights" element={<Flights/>}/>
    </Routes>
    </Router>
    </div>
  )
}

export default App