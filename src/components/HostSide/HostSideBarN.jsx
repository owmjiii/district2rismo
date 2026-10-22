import { useState } from 'react'

const menuItems = [
    { label: 'Dashboard', icon: 'bi-grid-fill' },
    { label: 'Notifications', icon: 'bi-bell-fill' },
    { label: 'Properties', icon: 'bi-houses-fill' },
    { label: 'Bookings', icon: 'bi-calendar-event-fill' },
    { label: 'Reviews', icon: 'bi-star-fill' },
    { label: 'Guest', icon: 'bi-people-fill' },
]

const generalItems = [
    { label: 'Settings', icon: 'bi-gear-fill' },
    { label: 'Help', icon: 'bi-question-circle-fill' },
]

export const HostSideBarN = ({ onSelect, onLogout }) => {
    const [activeItem, setActiveItem] = useState('Dashboard')

    const renderItem = (item) => (
        <button
            key={item.label}
            type="button"
            className={`list-group-item list-group-item-action d-flex align-items-center gap-2 text-nowrap rounded-2 ${activeItem === item.label ? 'active' : ''}`} aria-current={activeItem === item.label ? 'page' : undefined}
            onClick={() => {
                setActiveItem(item.label)
                onSelect?.(item.label)
            }}
        >
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
        </button>
    )

    return (
        <aside className="profile-sidebarN p-2 p-lg-3">
            <nav className="list-group list-group-flush gap-1 flex-column">
                <p className="text-uppercase text-secondary small px-3 mt-3 mb-2">Menu</p>
                {menuItems.map(renderItem)}

                <p className="text-uppercase text-secondary small px-3 mt-4 mb-2">General</p>
                {generalItems.map(renderItem)}

                <button type="button" className="list-group-item list-group-item-action d-flex align-items-center gap-2 text-nowrap rounded-2">
                    <i className="bi bi-box-arrow-right" aria-hidden="true" />
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    )
}