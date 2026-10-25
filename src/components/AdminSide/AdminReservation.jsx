import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const bookings = [
    {
        id: '2R-001',
        guest: 'Mi Massalang',
        phone: '0994 951 7001',
        email: 'mjmassalang11@gmail.com',
        reservationNumber: '00001',
        guestCount: 3,
        duration: 3,
        totalAmount: '\u20B112,500',
        amountPaid: '\u20B112,500',
        remainingBalance: '\u20B10',
        paymentDate: '2026-10-24',
        paymentMethod: 'Reservation #GWR-00001',
        property: "Fabian's Azzure",
        startDate: '2026-10-24',
        endDate: '2026-10-26',
        status: 'Confirmed',
    },
    {
        id: '2R-002',
        guest: 'Mj Massalang',
        property: 'Sirena Resort',
        startDate: '2026-10-25',
        endDate: '2026-10-27',
        status: 'Paid (Full Payment)',
    },
    {
        id: '2R-003',
        guest: 'Mj Massalang',
        property: 'Centro Digos Private Resort',
        startDate: '2026-10-25',
        endDate: '2026-10-27',
        status: 'Pending',
    },
]

const filters = ['All', 'Paid', 'Pending']

function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

export function AdminReservation({ preview = false }) {
    const [activeFilter, setActiveFilter] = useState('All')
    const [selectedProperty, setSelectedProperty] = useState('')
    const [search, setSearch] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const navigate = useNavigate()

    const properties = [...new Set(bookings.map((booking) => booking.property))]

    const filteredBookings = bookings.filter((booking) => {
        const matchesFilter =
            activeFilter === 'All' || booking.status.startsWith(activeFilter)
        const matchesProperty =
            !selectedProperty || booking.property === selectedProperty
        const matchesSearch = booking.id
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        const matchesDate = !selectedDate || booking.startDate === selectedDate

        return matchesFilter && matchesProperty && matchesSearch && matchesDate
    })

    return (
        <section className="admin-reservationsN container-fluid p-3 p-md-4">
            <div className="row align-items-center g-3 mb-4">
                <div className="col">
                    <h1 className="h2 fw-bold mb-0">Reservations</h1>
                </div>

                <div className="col-12 col-md-auto">
                    <select
                        className="form-select admin-reservation-propertyN"
                        aria-label="Select property"
                        value={selectedProperty}
                        onChange={(event) => setSelectedProperty(event.target.value)}
                    >
                        <option value="">Select Property</option>
                        {properties.map((property) => (
                            <option key={property} value={property}>
                                {property}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row align-items-center g-3 mb-3">
                <div className="col-12 col-xl-7">
                    <div
                        className="d-flex flex-wrap gap-2"
                        role="group"
                        aria-label="Filter reservations"
                    >
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                className={`btn admin-reservation-filterN ${
                                    activeFilter === filter ? 'active' : ''
                                }`}
                                aria-pressed={activeFilter === filter}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-12 col-xl-5">
                    <div className="d-flex gap-2">
                        <label className="btn admin-reservation-dateN position-relative mb-0">
                            <i className="bi bi-calendar3" aria-hidden="true" />
                            <span className="visually-hidden">Filter by date</span>
                            <input
                                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                type="date"
                                aria-label="Filter by date"
                                value={selectedDate}
                                onChange={(event) => setSelectedDate(event.target.value)}
                            />
                        </label>

                        <div className="input-group admin-reservation-searchN">
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search Booking ID"
                                aria-label="Search booking ID"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <span className="input-group-text">
                                <i className="bi bi-search" aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-borderless align-middle admin-reservation-tableN">
                    <thead>
                        <tr>
                            <th scope="col">Booking</th>
                            <th scope="col">Guest</th>
                            <th scope="col">Property</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>
                                    <button type="button" className="btn btn-link p-0 text-reset" onClick={() => navigate(`${preview ? "/admin-preview" : "/admin"}/reservations/${encodeURIComponent(booking.id)}`, { state: { booking } })}>
                                        {booking.id}
                                    </button>
                                </td>
                                <td>{booking.guest}</td>
                                <td>{booking.property}</td>
                                <td>
                                    {formatDate(booking.startDate)} -<br />
                                    {formatDate(booking.endDate)}
                                </td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredBookings.length === 0 && (
                    <p className="text-center py-4 mb-0">
                        No reservations match your filters.
                    </p>
                )}
            </div>
        </section>
    )
}


