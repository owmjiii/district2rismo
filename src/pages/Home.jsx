import React from 'react'
import Hero from '../components/Hero.jsx'
import Featured from '../components/Featured.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'
import Account from './Account.jsx'

function Home() {
    return (
        <div>
            <Hero />
            <Link to="/account">Account</Link>
            <Featured />
            <Footer />
        </div>
    )
}

export default Home