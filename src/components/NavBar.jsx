import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo2Rismo from '../images/2Rismo Logo.png'
import { LoginN } from './auth/LoginN.jsx'
import Modal from 'react-bootstrap/Modal'
import { BurgerOptionN } from './BurgerOptionN.jsx'
import { useAuth } from '../context/AuthContext'

function NavBar() {
    const [showLogin, setShowLogin] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)
    const [darkMode, setDarkMode] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isLogoVisible, setIsLogoVisible] = useState(true)

    const { currentUser, userData, userRole, logout } = useAuth()
    console.log('Current User:', currentUser)
    console.log('User Data:', userData)
    console.log('User Role:', userRole)
    
    useEffect(() => {
        const updateScrollState = () => setIsScrolled(window.scrollY > 0)

        window.addEventListener('scroll', updateScrollState, { passive: true })
        updateScrollState()

        return () => window.removeEventListener('scroll', updateScrollState)
    }, [])

    const tabs = [
        { key: 'private', label: 'Private Resort' },
        { key: 'hotel', label: 'Hotels' },
    ]
    const [category, setCategory] = useState('private')
    const [menuOpen, setMenuOpen] = useState(false)

    const currentLabel = tabs.find(t => t.key === category).label

    const handleUserClick = () => {
        if (currentUser) {
            setShowUserModal(true)
        } else {
            setShowLogin(true)
        }
    }

    return (
        <div>
            <header className={`site-header container-fluid py-4 d-flex justify-content-between${isScrolled ? ' is-scrolled' : ''}`}>
                {isLogoVisible && (
                    <Link to='/' className='logo-link d-inline-flex' aria-label='Go to home page'>
                        <img className='img-fluid logo' src={Logo2Rismo} alt='District 2rismo home' />
                    </Link>
                )}

                <div className='classification-dest d-flex align-items-center gap-2 px-3'>
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
                        {currentLabel} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
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
                    <button type="button" aria-label="Log in or sign up" onClick={handleUserClick} className="bg-transparent border-0 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 18 18">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    </button>
                    <BurgerOptionN darkMode={darkMode} onToggleDarkMode={setDarkMode} onNotifications={() => setShowLogin(true)} onHelpCenter={() => console.log('Help Center clicked')} onListProperty={() => console.log('List your property clicked')} onLogin={() => setShowLogin(true)} />
                </div>
            </header>

            <Modal show={showLogin} onHide={() => setShowLogin(false)} centered contentClassName="bg-transparent border-0">
                <Modal.Body className="p-0">
                    <LoginN onClose={() => setShowLogin(false)} />
                </Modal.Body>
            </Modal>

            <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered contentClassName="bg-dark text-white rounded-4 border border-secondary">
                <Modal.Header closeButton closeVariant="white" className="border-secondary">
                    <Modal.Title className="fw-bold">User Account</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {currentUser ? (
                        <div className="vstack gap-3">
                            <div>
                                <span className="text-secondary small">Name</span>
                                <h5 className="fw-bold mb-0">{userData?.firstName} {userData?.lastName} </h5>
                            </div>
                            <div>
                                <span className="text-secondary small">Email</span>
                                <p className="mb-0">{currentUser.email}</p>
                            </div>
                            <div>
                                <span className="text-secondary small">Role</span>
                                <p className="mb-0 text-capitalize">{userRole}</p>
                            </div>
                            <div className="d-flex gap-2 mt-3">     
                                <Link to="/account" className="btn btn-warning w-50 fw-bold" onClick={() => setShowUserModal(false)}>Manage Profile</Link>
                                <button className="btn btn-outline-danger w-50" onClick={() => { logout(); setShowUserModal(false); }}>Log Out</button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-secondary mb-0">No user currently logged in.</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NavBar