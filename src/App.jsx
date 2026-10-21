import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Destinations from './pages/Destinations.jsx'
import PlaceDetails from './pages/PlaceDetails.jsx'
import Account from './pages/Account.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/destination" element={<Destinations />}/>
        <Route path="/resorts/:id" element={<PlaceDetails />}/>
        <Route path="/destinationdetails" element={<PlaceDetails />}/>
        <Route path="/account" element={<Account />}/>
      </Routes>
    </>
  )
}

export default App
