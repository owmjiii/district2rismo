import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo2Rismo from '../images/2Rismo Logo.png'

function NavBarDetails() {
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

                <div className='page-navs'>
                    
                </div>

                <div className='d-flex align-items-center navi-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 18 18">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>

                    {/* DARK MODE NIGHT MODE ICON */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-list" viewBox="0 0 18 18">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                </div>
            </header>
        </div>
    )
}

export default NavBarDetails