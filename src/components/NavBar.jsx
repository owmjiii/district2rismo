import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo2Rismo from '../images/2Rismo Logo.png'

function NavBar() {

    // SCROLL
    const [isScrolled, setIsScrolled] = useState(false)
    const [isLogoVisible, setIsLogoVisible] = useState(true)

    useEffect(() => {
        const updateScrollState = () => setIsScrolled(window.scrollY > 0)

        window.addEventListener('scroll', updateScrollState, { passive: true })
        updateScrollState()

        return () => window.removeEventListener('scroll', updateScrollState)
    }, [])

    // CATEGORY BUTTONS
    const tabs = [
        { key: 'public', label: 'Public Resort' },
        { key: 'private', label: 'Private Resort' },
        { key: 'hotel', label: 'Hotels' },
    ]
    const [category, setCategory] = useState('public')
    const [menuOpen, setMenuOpen] = useState(false)

    const currentLabel = tabs.find(t => t.key === category).label

    return (
        <div>
            <header className={`site-header container-fluid py-4 d-flex justify-content-between${isScrolled ? ' is-scrolled' : ''}`}>
                {isLogoVisible && (
                    <Link to='/' className='logo-link d-inline-flex' aria-label='Go to home page'>
                        <img className='img-fluid logo' src={Logo2Rismo} alt='District 2rismo home' />
                    </Link>
                )}

                <div className='classification-dest d-flex align-items-start gap-2'>
                    {tabs.map(t => (
                        <button
                            key={t.key}
                            className={category === t.key ? 'active' : ''}
                            onClick={() => setCategory(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className='classification-dropdown '>
                    <button className='dropdown-toggle-btn' onClick={() => setMenuOpen(!menuOpen)}>
                        {currentLabel} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>

                    {menuOpen && (
                        <ul className='dropdown-list'>
                            {tabs.map(t => (
                                <li key={t.key}>
                                    <button
                                        className={category === t.key ? 'active' : ''}
                                        onClick={() => {
                                            setCategory(t.key)
                                            setMenuOpen(false)
                                        }}
                                    >
                                        {t.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='d-flex align-items-center navi-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 18 18">
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

export default NavBar