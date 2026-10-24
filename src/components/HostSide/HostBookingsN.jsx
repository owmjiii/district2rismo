import { useState } from 'react'
import { ConfirmBooking } from '../../pages/ConfirmBooking.jsx'

const sampleBookings = [
    { id: 1, guest: 'Mj Massalang', resort: 'Galilee Wonderland Resort', date: '2026-10-27', guests: 4, status: 'Pending' },
    { id: 2, guest: 'Mj Massalang', resort: 'Galilee Wonderland Resort', date: '2026-10-27', guests: 4, status: 'Pending' },
    { id: 3, guest: 'Mj Massalang', resort: 'Galilee Wonderland Resort', date: '2026-10-27', guests: 4, status: 'Pending' },
    { id: 4, guest: 'Mj Massalang', resort: 'Galilee Wonderland Resort', date: '2026-10-27', guests: 4, status: 'Pending' },
]

const filters = ['All', 'Pending', 'Accepted', 'Rejected']

const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
})

export const HostBookingsN = ({ onViewOrMarkUnavailable }) => {
    const [showDetails, setShowDetails] = useState(false)
    const [activeFilter, setActiveFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [selectedBooking, setSelectedBooking] = useState(sampleBookings[0])
    const [selectedDate, setSelectedDate] = useState(sampleBookings[0].date)

    const visibleBookings = sampleBookings.filter((booking) => {
        const matchesFilter = activeFilter === 'All' || booking.status === activeFilter
        const matchesSearch = booking.guest.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const handleSelectBooking = (booking) => {
        setSelectedBooking(booking)
        setSelectedDate(booking.date)
        setShowDetails(true)
    }

    if (showDetails) {
        return (
            <ConfirmBooking
                booking={selectedBooking}
                onBack={() => setShowDetails(false)}
                onConfirm={() => console.log('Confirm booking:', selectedBooking)}
                onReject={() => console.log('Reject booking:', selectedBooking)}
            />
        )
    }

    return (
        <section className="host-bookingsN container-fluid p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <h1 className="h2 fw-bold mb-0">Bookings</h1>
                <select className="form-select host-property-selectN" aria-label="Choose property">
                    <option>Fabian’s Azzure</option>
                    <option>Galilee Wonderland Resort</option>
                </select>
            </div>

            <div className="row g-3">
                <div className="col-12 col-lg-7">
                    <div className="host-booking-list-panelN rounded-3 p-3">
                        <div className="d-flex gap-2 flex-wrap mb-3" role="group" aria-label="Filter bookings">
                            {filters.map((filter) => (
                                <button key={filter} type="button" className={`btn btn-sm rounded-pill host-booking-filterN ${activeFilter === filter ? 'active' : ''}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <hr className="host-booking-dividerN mt-0" />

                        <p className="small mb-2">43 Guests</p>

                        <div className="input-group mb-2">
                            <input className="form-control host-booking-searchN" type="search" placeholder="Search Name" aria-label="Search guest names" value={search} onChange={(event) => setSearch(event.target.value)} />
                            <span className="input-group-text host-booking-search-iconN"><i className="bi bi-search" aria-hidden="true" /></span>
                        </div>

                        <div className="d-flex flex-column gap-1">
                            {visibleBookings.map((booking) => (
                                <article key={booking.id} className={`host-booking-rowN d-flex align-items-center gap-2 rounded-3 p-2 ${selectedBooking?.id === booking.id ? 'selected' : ''}`}>
                                    <div className="host-booking-avatarN rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                                        {booking.guest.charAt(0)}
                                    </div>

                                    <div className="flex-grow-1 min-w-0">
                                        <h2 className="small mb-0">{booking.guest}</h2>
                                        <p className="host-booking-resortN mb-0">{booking.resort}</p>
                                        <small className="host-booking-dateN">{formatDate(booking.date)}</small>
                                    </div>

                                    <span className={`host-booking-pill rounded-pill text-center ${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>

                                    <button type="button" className="btn btn-link host-booking-detailsN p-0 text-nowrap" onClick={() => handleSelectBooking(booking)}>
                                        View Details
                                    </button>
                                </article>
                            ))}
                            {visibleBookings.length === 0 && <p className="small text-secondary mb-0">No bookings found.</p>}
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-5">
                    <div className="host-availabilityN">
                        <label className="form-label small mb-2" htmlFor="host-availability-date">Calendar Availability</label>
                        <input id="host-availability-date" className="form-control host-availability-date-inputN mb-3" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} />

                        <div className="d-flex justify-content-between gap-3 small mb-2">
                            <span>Selected Date</span>
                            <span>{selectedDate ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) : '—'}</span>
                        </div>
                        <div className="d-flex justify-content-between gap-3 small mb-2">
                            <span>Guest’s Name</span>
                            <span className="text-end">{selectedBooking?.guest || '—'}</span>
                        </div>
                        <div className="d-flex justify-content-between gap-3 small mb-4">
                            <span>Number of guests</span>
                            <span>{selectedBooking ? `${selectedBooking.guests} or -` : '—'}</span>
                        </div>

                        <button
                            type="button"
                            className="btn btn-warning rounded-pill w-100 py-3"
                            onClick={() => setShowDetails(true)}
                            disabled={!selectedBooking}
                        >
                            View Booking Details
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}