import { useState } from 'react'
import resortImage from '../../images/Bustos Hero.png'
import { AdminUserDeactivate } from './AdminUserDeactivate.jsx'
import { AdminUserSuspend } from './AdminUserSuspend.jsx'

const bookings = [
    {
        status: 'Confirmed',
        date: '10/27/26',
        session: 'Day Swimming',
        price: '₱2,740.00',
        review: 'Review after your stay',
    },
    {
        status: 'Completed',
        date: '10/19/26',
        session: 'Day Swimming',
        price: '₱2,740.00',
        review: 'Review submitted or Leave a Review',
    },
    {
        status: 'Canceled',
        date: '10/19/26',
        session: 'Day Swimming',
        price: '₱2,740.00',
        review: 'Review submitted or Leave a Review',
    },
]

const bookingFilters = ['All', 'Completed', 'Confirmed', 'Canceled']

const reviewCategories = [
    'Cleanliness',
    'Pools & Attractions',
    'Facilities & Amenities',
    'Staff & Service',
    'Value for Money',
    'Safety',
]

export function AdminUserDetail({ user, onBack }) {
    const [bookingFilter, setBookingFilter] = useState('All')
    const [showDeactivate, setShowDeactivate] = useState(false)
    const [showSuspend, setShowSuspend] = useState(false)

    const visibleBookings = bookings.filter(
        (booking) => bookingFilter === 'All' || booking.status === bookingFilter
    )

    return (
        <section className="admin-user-detailN container-fluid p-3 p-md-4">
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb small mb-0">
                    <li className="breadcrumb-item">
                        <button
                            type="button"
                            className="admin-user-breadcrumb-backN"
                            onClick={onBack}
                        >
                            Users
                        </button>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        User Details
                    </li>
                </ol>
            </nav>

            <header className="admin-user-detail-headerN card border-0 p-3 p-md-4 mb-3">
                <div className="row align-items-center g-3">
                    <div className="col-auto">
                        <span className="admin-user-detail-avatarN rounded-circle d-flex align-items-center justify-content-center">
                            {user.name.charAt(0)}
                        </span>
                    </div>
                    <div className="col">
                        <h1 className="h3 mb-0">{user.name}</h1>
                        <p className="small text-warning mb-0">Joined: January 12, 2026</p>
                    </div>
                    <div className="col-12 col-md-auto">
                        <span className={`badge rounded-pill admin-user-statusN ${user.status === 'Active' ? 'active' : ''}`}>
                            {user.status}
                        </span>
                    </div>
                </div>
            </header>

            <section className="admin-user-detail-panelN card p-3 p-md-4 mb-3">
                <h2 className="h6 fw-semibold mb-3">Basic and Contact Information</h2>
                <dl className="mb-0">
                    <div className="d-flex justify-content-between gap-3 py-2">
                        <dt className="fw-normal">Full Name</dt>
                        <dd className="mb-0 text-end">{user.name}</dd>
                    </div>
                    <div className="d-flex justify-content-between gap-3 py-2">
                        <dt className="fw-normal">Email Address</dt>
                        <dd className="mb-0 text-end">{user.email}</dd>
                    </div>
                    <div className="d-flex justify-content-between gap-3 py-2">
                        <dt className="fw-normal">Date of Birth</dt>
                        <dd className="mb-0 text-end">March 24, 2006</dd>
                    </div>
                </dl>
            </section>

            <section className="admin-user-detail-panelN card p-3 p-md-4 mb-3">
                <h2 className="h6 fw-semibold mb-3">Booking History</h2>

                <div className="d-flex flex-wrap gap-2 mb-3" role="group" aria-label="Filter bookings">
                    {bookingFilters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            className={`btn btn-sm admin-user-booking-filterN ${bookingFilter === filter ? 'active' : ''}`}
                            aria-pressed={bookingFilter === filter}
                            onClick={() => setBookingFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="d-flex flex-column gap-2">
                    {visibleBookings.map((booking, index) => (
                        <article className="admin-user-bookingN card overflow-hidden" key={`${booking.status}-${index}`}>
                            <div className="row g-0 align-items-stretch">
                                <div className="col-12 col-md-6 d-flex align-items-center gap-2 p-2">
                                    <img
                                        className="admin-user-booking-imageN rounded-2 flex-shrink-0"
                                        src={resortImage}
                                        alt="Galilee Wonderland Resort"
                                    />
                                    <div className="admin-user-booking-copyN">
                                        <h3 className="fw-semibold mb-0">Galilee Wonderland Resort</h3>
                                        <p className="text-warning mb-1">Bustos, Bulacan</p>
                                        <p className="mb-1">Total Price: {booking.price}</p>
                                        <p className="mb-1">{booking.review}</p>
                                        <span className="badge rounded-pill admin-user-statusN">
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 admin-user-booking-detailsN p-3">
                                    <p className="mb-2">Details:</p>
                                    <div className="d-flex justify-content-between gap-3">
                                        <span>Session</span>
                                        <span className="text-end">{booking.session}</span>
                                    </div>
                                    <div className="d-flex justify-content-between gap-3">
                                        <span>Date</span>
                                        <span className="text-end">{booking.date}</span>
                                    </div>
                                    <div className="d-flex justify-content-between gap-3">
                                        <span>Cottage</span>
                                        <span className="text-end">Cottage 1</span>
                                    </div>
                                    <div className="d-flex justify-content-between gap-3">
                                        <span>Guest</span>
                                        <span className="text-end">6 Adults, 3 Kids, 0 Seniors</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="admin-user-detail-panelN card p-3 p-md-4 mb-3">
                <h2 className="h5 mb-3">Reviews</h2>

                <article className="admin-user-reviewN card border-0 align-self-start">
                    <div className="admin-user-review-topN d-flex gap-2 p-2">
                        <img
                            className="admin-user-review-imageN rounded-2 flex-shrink-0"
                            src={resortImage}
                            alt="Galilee Wonderland Resort"
                        />
                        <div className="admin-user-review-summaryN">
                            <h3 className="fw-semibold mb-0">Galilee Wonderland Resort</h3>
                            <p className="text-warning mb-1">Bustos, Bulacan</p>
                            <p className="mb-1">Client stay date: 10/19/26</p>
                            <hr className="admin-user-review-summary-dividerN" />
                            <p className="mb-0">Client's overall experience</p>
                            <p className="text-warning mb-0" aria-label="5 out of 5 stars">★★★★★</p>
                        </div>
                    </div>

                    <div className="admin-user-review-contentN p-2">
                        <p className="mb-2">Client's experience</p>

                        {reviewCategories.map((category, index) => (
                            <div className="d-flex justify-content-between gap-2" key={category}>
                                <span>{category}</span>
                                <span
                                    className={`admin-user-review-starsN text-nowrap ${index === 0 ? 'rated' : ''}`}
                                    aria-label={`${index === 0 ? 5 : 0} out of 5 stars`}
                                >
                                    {index === 0 ? '★★★★★' : '☆☆☆☆☆'}
                                </span>
                            </div>
                        ))}

                        <hr className="admin-user-review-dividerN" />
                        <p className="mb-1">Client's comment</p>
                        <p className="admin-user-review-commentN rounded p-2 mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio est id sit dolore vel est ad ducimus mollitia assumenda at qui tempore quod magni.
                        </p>
                        <div className="admin-user-review-dateN text-center rounded-pill p-2">
                            Review Submitted on<br />
                            <span className="text-warning">10/19/26</span>
                        </div>
                    </div>
                </article>
            </section>

            <div className="d-flex flex-wrap justify-content-end gap-3">
                <button
                    type="button"
                    className="btn admin-user-actionN admin-user-account-buttonN"
                    onClick={() => setShowDeactivate(true)}
                >
                    Deactivate Account
                </button>
                <button
                    type="button"
                    className="btn btn-warning rounded-pill admin-user-account-buttonN"
                    onClick={() => setShowSuspend(true)}
                >
                    Suspend Account
                </button>
            </div>

            <AdminUserDeactivate
                show={showDeactivate}
                user={user}
                onHide={() => setShowDeactivate(false)}
            />
            <AdminUserSuspend
                show={showSuspend}
                user={user}
                onHide={() => setShowSuspend(false)}
            />
        </section>
    )
}