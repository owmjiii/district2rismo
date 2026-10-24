const ratingDistribution = [
    { stars: 5, percent: 70 },
    { stars: 4, percent: 22 },
    { stars: 3, percent: 12 },
    { stars: 2, percent: 6 },
    { stars: 1, percent: 2 },
]

const ratingBreakdown = [
    { label: 'Cleanliness', rating: 4.1 },
    { label: 'Pools & Attractions', rating: 4.1 },
    { label: 'Facilities & Amenities', rating: 4.1 },
    { label: 'Staff & Service', rating: 4.1 },
    { label: 'Value for Money', rating: 4.1 },
    { label: 'Safety', rating: 4.1 },
]

const reviews = [
    {
        id: 1,
        guest: 'Mj Massalang',
        date: 'Oct 2026',
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Optio est id sit dolore at vel est ad ducimus mollitia assumenda at tempore quod magna.',
    },
    {
        id: 2,
        guest: 'Mj Massalang',
        date: 'Oct 2026',
        rating: 5,
        comment: 'The resort was clean and enjoyable. We had a great time with family and would visit again.',
    },
    {
        id: 3,
        guest: 'Ana Santos',
        date: 'Sep 2026',
        rating: 4,
        comment: 'Friendly staff and a relaxing place to spend the day.',
    },
]

const Stars = ({ rating, label }) => (
    <span className="d-inline-flex align-items-center gap-1" aria-label={label}>
        {[1, 2, 3, 4, 5].map((star) => (
            <i key={star} className={`bi ${star <= rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`} aria-hidden="true" />
        ))}
    </span>
)

export const HostReviewsN = ({ onReportReview }) => (
    <section className="host-reviewsN container-fluid p-3 p-md-4">
        <div className="host-reviews-contentN">
            <h1 className="h2 fw-bold text-warning mb-4">Reviews</h1>

            <div className="d-flex align-items-center gap-4 mb-5">
                <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-star-fill text-warning host-overall-starN" aria-hidden="true" />
                    <div className="text-center">
                        <div className="h2 fw-bold mb-0">4.6</div>
                        <small className="text-secondary">245 reviews</small>
                    </div>
                </div>

                <div className="flex-grow-1">
                    {ratingDistribution.map(({ stars, percent }) => (
                        <div key={stars} className="d-flex align-items-center gap-2 host-rating-distribution-rowN">
                            <small>{stars}</small>
                            <div className="progress flex-grow-1 host-rating-progressN" role="progressbar" aria-label={`${stars} star ratings`} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar" style={{ width: `${percent}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="h6 fw-bold mb-3">Rating Breakdown</h2>

            <div className="mb-4">
                {ratingBreakdown.map(({ label, rating }) => (
                    <div key={label} className="d-flex align-items-center gap-2 host-rating-breakdown-rowN">
                        <span className="flex-grow-1">{label}</span>
                        <small>{rating.toFixed(1)}</small>
                        <div className="progress host-breakdown-progressN" role="progressbar" aria-label={`${label}: ${rating} out of 5`} aria-valuenow={rating * 20} aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{ width: `${rating * 20}%` }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="vstack gap-2 host-review-listN" aria-label="Guest reviews">
                {reviews.map((review) => (
                    <article key={review.id} className="card border-0 rounded-3 host-review-cardN">
                        <div className="card-body p-3">
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 host-review-avatarN">
                                    {review.guest.charAt(0)}
                                </span>
                                <h3 className="h6 mb-0 text-nowrap">{review.guest}</h3>
                                <Stars rating={review.rating} label={`${review.rating} out of 5 stars`} />
                                <small className="text-secondary text-nowrap">{review.date}</small>
                                <button type="button" className="btn btn-warning btn-sm rounded-pill ms-auto px-3" onClick={() => onReportReview?.(review)}>
                                    Report <i className="bi bi-flag-fill ms-1" aria-hidden="true" />
                                </button>
                            </div>
                            <p className="small mb-0 host-review-commentN">{review.comment}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
)