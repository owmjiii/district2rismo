import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBarDetails.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'
import CottageCard from '../components/StayCard.jsx'
import Footer from '../components/Footer.jsx'
import BookingCard from '../components/BookingCard.jsx'
import CottageImg from '../images/Baliwag Hero.png'
import Img1 from '../images/Baliwag Featured.png'
import Img2 from '../images/Bustos Hero.png'
import Img3 from '../images/Plaridel Hero.png'
import Img4 from '../images/Baliwag Hero.png'
import Img5 from '../images/Baliwag Featured.png'

const cottages = [
    { id: 1, image: CottageImg, name: 'Cottage 1', capacity: '15-20', price: 1000 },
    { id: 2, image: CottageImg, name: 'Cottage 2', capacity: '25-35', price: 1500 },
    { id: 3, image: CottageImg, name: 'Cottage 3', capacity: '5-8', price: 500 },
    { id: 4, image: CottageImg, name: 'Cottage 4', capacity: '40-50', price: 2500 },
]

const ratingCounts = { 5: 170, 4: 40, 3: 18, 2: 9, 1: 8 }

const categoryRatings = [
    { label: 'Cleanliness', score: 4.1 },
    { label: 'Pools & Attractions', score: 4.1 },
    { label: 'Facilities & Amenities', score: 4.1 },
    { label: 'Staff & Service', score: 4.1 },
    { label: 'Value for Money', score: 4.1 },
    { label: 'Safety', score: 4.1 },
]

const reviews = [
    { id: 1, name: 'Mj Massalang', rating: 5, date: 'Oct 2026', text: 'lorem ipsum dolor sit amet consectetur adipiscing elit optio est id sit dolore at vel est ad ducimus mollitia assumenda at qui tempore quod magna' },
    { id: 2, name: 'Nheil Ryan', rating: 5, date: 'Oct 2026', text: 'lorem ipsum dolor sit amet consectetur adipiscing elit optio est id sit dolore at vel est ad ducimus mollitia assumenda at qui tempore quod magna' },
    { id: 3, name: 'Mark Gian', rating: 4, date: 'Oct 2026', text: 'lorem ipsum dolor sit amet consectetur adipiscing elit optio est id sit dolore at vel est ad ducimus mollitia assumenda at qui tempore quod magna' },
    { id: 4, name: 'Ron Roberto', rating: 5, date: 'Oct 2026', text: 'lorem ipsum dolor sit amet consectetur adipiscing elit optio est id sit dolore at vel est ad ducimus mollitia assumenda at qui tempore quod magna' },
]

function Star({ size = 16, filled = true }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16"
            fill="currentColor" className={filled ? 'star-on' : 'star-off'}>
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
    )
}

function PlaceDetails() {
    const { id } = useParams()
    const [bookingOpen, setBookingOpen] = useState(false)
    const bookingTriggerRef = useRef(null)
    const bookingCloseRef = useRef(null)

    const images = [Img1, Img2, Img3, Img4, Img5]

    const totalReviews = Object.values(ratingCounts).reduce((a, b) => a + b, 0)
    const averageRating =
        Object.entries(ratingCounts).reduce((sum, [star, n]) => sum + Number(star) * n, 0) / totalReviews

    useEffect(() => {
        if (!bookingOpen) return

        const closeOnEscape = event => {
            if (event.key === 'Escape') setBookingOpen(false)
        }
        const trigger = bookingTriggerRef.current
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        bookingCloseRef.current?.focus()
        window.addEventListener('keydown', closeOnEscape)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', closeOnEscape)
            trigger?.focus()
        }
    }, [bookingOpen])

    return (
        <>
            <div className={`destinations-page place-details-page mx-3${bookingOpen ? ' booking-open' : ''}`}>
                <NavBar />
                <PhotoGallery images={images} />

                <div className='details-parent-container row'>
                    <div className='details col-12 col-lg-7'>

                        <div className='place-name my-4 d-flex flex-column gap-4'>
                            <div>
                                <h1>Galilee Wonderland Resort</h1>
                                <h3>Brgy. San Pedro, Bustos, Bulacan</h3>
                            </div>

                            <div>
                                <span>Public Resort</span>
                            </div>
                        </div>

                        <hr className='my-4' />

                        <div className='information'>
                            <h3 className='rate-title'>Day and Night Swimming</h3>
                            <small className='rate-schedule'>
                                Day (8:00 AM - 5:00 PM), Night (3:00 PM - 11:00 PM)
                            </small>

                            <table className='rate-table'>
                                <tbody>
                                    <tr>
                                        <td>Adult</td>
                                        <td>₱200.00</td>
                                    </tr>
                                    <tr>
                                        <td>Kids (Below 4 Feet)</td>
                                        <td>₱180.00</td>
                                    </tr>
                                    <tr>
                                        <td>Senior Citizen</td>
                                        <td>₱160.00</td>
                                    </tr>
                                </tbody>
                            </table>

                            <p className='rate-desc'>
                                The crisp of the morning dews, tenderness of the alluring sunset and the
                                serenity of chaste plains embraced the 5th day of March 2004, marking the
                                establishment of Galilee on a 10-hectare land, blessed and appointed to
                                gratify the prominence of the graces of the Almighty. Three (3) swimming
                                pools (Ark of Covenant, Jordan River and Pools of Siloam) were carved out,
                                which, by then, primarily cater water baptisms. These devout undertakings
                                are celebrated through simple fellowships under the shelter of Gethsemane
                                Hall, just within the vicinity.
                            </p>

                            <button className='button'>Show more</button>
                        </div>

                        <hr className='my-4' />

                        <div className='offers'>
                            <h2 className='detail-title d-flex gap-2 align-items-center'>
                                What this place offers
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </h2>

                            <ul className='offers-list'>
                                <li>4 Adult Pools</li>
                                <li>2 Adult Pools</li>
                                <li>1 Wave Pool</li>
                                <li>Cottages</li>
                                <li>Food and refreshments</li>
                                <li>Water Attractions</li>
                                <li>Sports and recreation</li>
                                <li>Wellness and relaxation</li>
                            </ul>
                        </div>

                        <div className='cottages my-4'>
                            <h2 className='detail-title'>Cottages</h2>

                            <div className='cottage-grid'>
                                {cottages.map(c => (
                                    <CottageCard key={c.id} {...c} />
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className='booking col-lg-5 my-4 position-sticky align-self-start'>
                        <BookingCard cottages={cottages} />
                    </div>
                </div>

                <button
                    type='button'
                    className='mobile-booking-trigger'
                    ref={bookingTriggerRef}
                    aria-expanded={bookingOpen}
                    aria-controls='mobile-booking-panel'
                    onClick={() => setBookingOpen(true)}
                >
                    Book your stay
                </button>

                {bookingOpen && (
                    <button
                        type='button'
                        className='booking-backdrop'
                        aria-label='Close booking'
                        onClick={() => setBookingOpen(false)}
                    />
                )}

                <div
                    id='mobile-booking-panel'
                    className='mobile-booking-panel'
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby='mobile-booking-title'
                >
                    <div className='mobile-booking-header'>
                        <h2 id='mobile-booking-title'>Book your stay</h2>
                        <button
                            type='button'
                            className='mobile-booking-close'
                            ref={bookingCloseRef}
                            aria-label='Close booking'
                            onClick={() => setBookingOpen(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <BookingCard cottages={cottages} />
                </div>

                <div className='reviews row'>
                    <h2 className='detail-title'>Reviews</h2>

                    <div className='col-lg-7 col-12'>
                        <div className='chart'>
                            <div className='overall-review'>
                                <Star size={48} />
                                <div className='rating-summary'>
                                    <h3>{averageRating.toFixed(1)}</h3>
                                    <span>{totalReviews} reviews</span>
                                </div>
                            </div>

                            <div className='breakdown-review'>
                                {[5, 4, 3, 2, 1].map(star => (
                                    <div className='breakdown-row' key={star}>
                                        <span className='breakdown-label'>{star}</span>
                                        <div className='breakdown-track'>
                                            <div
                                                className='breakdown-fill'
                                                style={{ width: `${(ratingCounts[star] / totalReviews) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='category-breakdown'>
                            <h4>Rating Breakdown</h4>
                            {categoryRatings.map(c => (
                                <div className='category-row' key={c.label}>
                                    <span className='category-label'>{c.label}</span>
                                    <span className='category-score'>{c.score.toFixed(1)}</span>
                                    <div className='breakdown-track'>
                                        <div className='breakdown-fill' style={{ width: `${(c.score / 5) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='col-lg-5 col-12'>
                        <div className='comments'>
                            {reviews.map(r => (
                                <div className='comment-card' key={r.id}>
                                    <div className='avatar'>{r.name[0]}</div>
                                    <div className='comment-body'>
                                        <div className='comment-header'>
                                            <span className='comment-name'>{r.name}</span>
                                            <div className='comment-stars'>
                                                {[1, 2, 3, 4, 5].map(n => (
                                                    <Star key={n} size={14} filled={n <= r.rating} />
                                                ))}
                                            </div>
                                            <small className='comment-date'>{r.date}</small>
                                        </div>
                                        <p className='comment-text'>{r.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='location-container my-4'>
                    <h2 className='detail-title'>Location</h2>
                    <span className='location-sub'>Brgy. San Pedro, Bustos, Bulacan</span>

                    <div className='map-integration'>
                        {/* MAP INTEG */}
                    </div>

                    <p className='location-address'>
                        Gen. Alejo G. Santos Highway, Brgy. San Pedro, Bustos, Philippines
                    </p>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default PlaceDetails