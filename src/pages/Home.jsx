import React from 'react'
import Hero from '../components/Hero.jsx'
import Featured from '../components/Featured.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'


function Home() {
    return (
        <div>
            <Hero />
            <Link to="/account">Account</Link>
            <Link to="/host">Host</Link>
            <Featured />
            <Footer />
        </div>
    )
}

export default Home