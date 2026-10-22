import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo2Rismo from '../images/2Rismo Logo.png'
import { LoginN } from './auth/LoginN.jsx'
import Modal from 'react-bootstrap/Modal'
import { BurgerOptionN } from './BurgerOptionN.jsx'

function Header() {

    const [showLogin, setShowLogin] = useState(false)

     // dark mode 
    const [darkMode, setDarkMode] = useState(true)

    const [isScrolled, setIsScrolled] = useState(false)


    useEffect(() => {
        const updateScrollState = () => setIsScrolled(window.scrollY > 0)

        window.addEventListener('scroll', updateScrollState, { passive: true })
        updateScrollState()

        return () => window.removeEventListener('scroll', updateScrollState)
    }, [])

    return (
        <div>
            <header className={`site-header container-fluid d-flex justify-content-between${isScrolled ? ' is-scrolled' : ''}`}>
                <Link to='/' className='d-inline-flex' aria-label='Go to home page'>
                    <img className='img-fluid logo' src={Logo2Rismo} alt='District 2rismo home' />
                </Link>

                <div className='d-flex align-items-center navi-container'>
                    <span className='header-link text-decoration-none' onClick={() => setShowLogin(true)}>List your Property</span>
                    
                    <button type="button" aria-label="Log in or sign up" onClick={() => setShowLogin(true)} className="bg-transparent border-0 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 18 18">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    </button>
                    {/* DARK MODE NIGHT MODE ICON */}
                    <BurgerOptionN darkMode={darkMode} onToggleDarkMode={setDarkMode} onNotifications={() => setShowLogin(true)} onHelpCenter={() => console.log('Help Center clicked')} onListProperty={() => console.log('List your property clicked')} onLogin={() => setShowLogin(true)} />
                </div>
            </header>
            <Modal show={showLogin} onHide={() => setShowLogin(false)} centered contentClassName="bg-transparent border-0">
                <Modal.Body className="p-0">
                    <LoginN onClose={() => setShowLogin(false)} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Header