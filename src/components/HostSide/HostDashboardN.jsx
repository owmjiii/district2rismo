const recentBookings = [
    { id: 1, guest: 'Mj Massalang', resort: 'Galilee Wonderland Resort', date: 'Oct 27, 2026', status: 'Pending' },
    { id: 2, guest: 'Mj Massalang', resort: 'Galilee Wonderland Resort', date: 'Oct 27, 2026', status: 'Completed' },
    { id: 3, guest: 'Mj Massalang', resort: 'Galilee Wonderland Resort', date: 'Oct 27, 2026', status: 'Completed' },
]

const stats = [
    { label: <>Total Bookings<br />(This Month)</>, value: '26', highlight: true },
    { label: 'My Properties', value: '1' },
    { label: <>Pending<br />Request</>, value: '5' },
]

export const HostDashboardN = () => (
    <section className="host-dashboardN container-fluid p-3 p-md-4 text-white">
        <h1 className="h2 fw-bold text-warning mb-3">Dashboard</h1>

        <div className="row g-2 host-statsN mb-4">
            {stats.map((stat) => (
                <div key={stat.value + (stat.highlight ? '-bookings' : '')} className="col-4">
                    <article className={`host-stat-cardN h-100 rounded-3 p-2 p-md-3 ${stat.highlight ? 'highlight' : ''}`}>
                        <div className="d-flex justify-content-between gap-2">
                            <span className="small lh-sm">{stat.label}</span>
                            <i className="bi bi-arrow-up-right-circle fs-5" aria-hidden="true" />
                        </div>
                        <p className="display-6 fw-bold mb-0">{stat.value}</p>
                    </article>
                </div>
            ))}
        </div>

        <h2 className="h5 host-recent-titleN mb-2">Recent Bookings</h2>

        <div className="d-flex flex-column gap-1">
            {recentBookings.map((booking) => (
                <article key={booking.id} className="host-bookingN rounded-3 d-flex align-items-center gap-2 gap-md-3 p-2 p-md-3">
                    <div className="host-booking-avatarN rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                        {booking.guest.charAt(0)}
                    </div>
                    <div className="flex-grow-1">
                        <h3 className="h5 mb-0">{booking.guest}</h3>
                        <p className="small text-warning mb-0">{booking.resort}</p>
                        <small className="host-booking-dateN">{booking.date}</small>
                    </div>
                    <span className={`host-booking-statusN rounded-pill text-center ${booking.status === 'Pending' ? 'pending' : ''}`}>
                        {booking.status}
                    </span>
                </article>
            ))}
        </div>

        <button type="button" className="btn btn-link host-view-bookingsN px-0 mt-1">View All Bookings</button>
    </section>
)