import { useRef, useState } from 'react'
import resortImage from '../../images/Baliwag Featured.png'

const initialDestinations = [
    { id: 1, name: 'Galilee Wonderland Resort', location: 'Bustos, Bulacan', date: '10/27/26', reviewed: false, rating: 0, comment: '' },
    { id: 2, name: 'Galilee Wonderland Resort', location: 'Bustos, Bulacan', date: '10/19/26', reviewed: true, rating: 5, comment: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
    { id: 3, name: 'Galilee Wonderland Resort', location: 'Bustos, Bulacan', date: '10/10/26', reviewed: false, rating: 0, comment: '' },
]

const categories = ['All', 'To Review', 'Reviewed']
const ratingCategories = ['Cleanliness', 'Pools & Attractions', 'Facilities & Amenities', 'Staff & Service', 'Value for Money', 'Safety']

export const DestinationToReviewN = () => {

    const reviewListRef = useRef(null)
    const dragRef = useRef({ startX: 0, scrollLeft: 0, moved: false })
    const [isDragging, setIsDragging] = useState(false)

    const handlePointerDown = (event) => {
        if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button, textarea, input, label')) return

        const list = event.currentTarget
        dragRef.current = {
            startX: event.clientX,
            scrollLeft: list.scrollLeft,
            moved: false,
        }
        list.setPointerCapture(event.pointerId)
        setIsDragging(true)
    }

    const handlePointerMove = (event) => {
        if (!isDragging || !reviewListRef.current) return

        const distance = event.clientX - dragRef.current.startX
        if (Math.abs(distance) > 3) dragRef.current.moved = true
        reviewListRef.current.scrollLeft = dragRef.current.scrollLeft - distance
    }

    const handlePointerUp = () => {
        setIsDragging(false)
    }
    const [destinations, setDestinations] = useState(initialDestinations)
    const [activeCategory, setActiveCategory] = useState('All')
    const [ratings, setRatings] = useState({})
    const [comments, setComments] = useState({})

    const visibleDestinations = destinations.filter((destination) => {
        if (activeCategory === 'To Review') return !destination.reviewed
        if (activeCategory === 'Reviewed') return destination.reviewed
        return true
    })

    const setRating = (destinationId, category, rating) => {
        setRatings((current) => ({
            ...current,
            [destinationId]: {
                ...current[destinationId],
                [category]: rating,
            },
        }))
    }

    const submitReview = (destinationId) => {
        setDestinations((current) => current.map((destination) => (
            destination.id === destinationId
                ? { ...destination, reviewed: true }
                : destination
        )))
    }

    return (
        <section className="destination-reviewsN container-fluid p-3 p-md-4 p-lg-5 text-white">
            <h1 className="h2 fw-bold destination-reviews-titleN mb-2">Destination to Review</h1>

            <div className="d-flex gap-2 mb-2" role="group" aria-label="Filter destinations">
                {categories.map((category) => (
                    <button key={category} type="button" className={`btn btn-sm rounded-pill destination-filterN ${activeCategory === category ? 'active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>

            {visibleDestinations.length === 0 ? (
                <p className="text-secondary">No destinations in this category.</p>
            ) : (
                <div
                    ref={reviewListRef}
                    className={`destination-review-listN${isDragging ? ' is-dragging' : ''}`}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onClickCapture={(event) => {
                        if (dragRef.current.moved) {
                            event.preventDefault()
                            event.stopPropagation()
                            dragRef.current.moved = false
                        }
                    }}
                >                    {visibleDestinations.map((destination) => (
                    <article key={destination.id} className="destination-review-cardN card border-0 overflow-hidden">
                        <div className="destination-review-summaryN d-flex gap-2 p-2">
                            <img className="destination-review-imageN rounded-2" src={resortImage} alt={destination.name} />
                            <div className="min-w-0">
                                <h2 className="small fw-semibold mb-0">{destination.name}</h2>
                                <p className="small text-warning mb-0">{destination.location}</p>
                                <p className="destination-review-dateN mb-1">Your stay: {destination.date}</p>
                                <p className="destination-review-promptN mb-0">How was your overall experience?</p>
                                <div className="d-flex gap-1" aria-label={`${destination.rating} out of 5 stars`}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i key={star} className={`bi ${star <= (ratings[destination.id]?.Overall ?? destination.rating) ? 'bi-star-fill text-warning' : 'bi-star'}`} aria-hidden="true" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="destination-review-formN p-2">
                            <p className="small mb-2">{destination.reviewed ? 'Your experience' : 'Rate your experience'}</p>

                            {ratingCategories.map((category) => (
                                <div key={category} className="d-flex justify-content-between align-items-center gap-2 destination-rating-rowN">
                                    <span>{category}</span>
                                    <span className="d-flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" className="btn p-0 destination-starN" aria-label={`${category}: ${star} stars`} disabled={destination.reviewed} onClick={() => setRating(destination.id, category, star)}>
                                                <i className={`bi ${star <= (ratings[destination.id]?.[category] ?? (destination.reviewed ? destination.rating : 0)) ? 'bi-star-fill text-warning' : 'bi-star'}`} aria-hidden="true" />
                                            </button>
                                        ))}
                                    </span>
                                </div>
                            ))}

                            <hr className="my-2" />

                            <label className="small mb-1" htmlFor={`review-comment-${destination.id}`}>
                                {destination.reviewed ? 'Your comment' : 'Leave a comment'}
                            </label>
                            <textarea id={`review-comment-${destination.id}`} className="form-control destination-review-commentN" rows="3" placeholder="What did you like or dislike about your stay?" value={comments[destination.id] ?? destination.comment} disabled={destination.reviewed} onChange={(event) => setComments((current) => ({ ...current, [destination.id]: event.target.value }))} />

                            {destination.reviewed ? (
                                <div className="destination-review-submittedN rounded-pill text-center mt-2">
                                    <small className="d-block">Review Submitted</small>
                                    <span className="text-warning">{destination.date}</span>
                                </div>
                            ) : (
                                <button type="button" className="btn btn-warning w-100 rounded-pill mt-2" onClick={() => submitReview(destination.id)}>
                                    Submit Review
                                </button>
                            )}
                        </div>
                    </article>
                ))}
                </div>
            )}
        </section>
    )
}