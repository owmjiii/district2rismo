import { Fragment, useState } from 'react'
import resortImage from '../../../images/Bustos Hero.png'

const defaultBedrooms = [
    { name: 'Bedroom 1', description: '10-20 person • 4 Double Deck Beds and 2 Extra Mattresses' },
    { name: 'Main Bedroom', description: '8-12 person • 2 King Size Beds and 2 Extra Mattresses' },
]

const defaultFeatures = [
    ['1 Adult Pool', '80-100 Guest capacity'],
    ['1 Kid Pool', 'Kitchen'],
    ['2 Bedrooms', 'Entertainment'],
    ['Cottages', 'Kitchen'],
    ['Event Place', ''],
]

export const HostViewProperty = ({
    property,
    onBack,
    onViewBookings,
    onViewReviews,
    onEdit,
    onDelete,
}) => {
    const [showMore, setShowMore] = useState(false)
    const name = property?.name || 'Fabian’s Azzure Private Resort'
    const location = property?.location || 'Brgy. Pinagbarilan, Baliwag, Bulacan'
    const galleryImages = property?.galleryImages || [resortImage, resortImage, resortImage, resortImage]
    const features = property?.amenities
        ? Array.from({ length: Math.ceil(property.amenities.length / 2) }, (_, index) => [
            property.amenities[index * 2],
            property.amenities[index * 2 + 1] || '',
        ])
        : defaultFeatures
    const bedrooms = property?.bedrooms || defaultBedrooms
    const tours = property?.tourSettings
    const bedroomDescription = (bedroom) => bedroom.description || [
        bedroom.capacity,
        bedroom.beds?.map((bed) => `${bed.quantity} ${bed.type}`).join(' and '),
    ].filter(Boolean).join(' • ')

    return (
        <section className="host-view-property-pageN mx-5">
            <nav aria-label="Breadcrumb" className="small mb-3">
                <button
                    type="button"
                    className="btn btn-link p-0 host-view-property-crumbN"
                    onClick={onBack}
                >
                    Properties
                </button>
                <span className="mx-1">›</span>
                <span className="text-warning">View Property</span>
            </nav>

            <div className="row g-3">
                <div className="col-12 col-md-7">
                    <img
                        className="host-view-property-main-imageN rounded-2 w-100"
                        src={property?.image || resortImage}
                        alt={name}
                    />
                </div>

                <div className="col-12 col-md-5">
                    <div className="row g-2">
                        {galleryImages.map((image, index) => (
                            <div className="col-6" key={index}>
                                <img
                                    className="host-view-property-gallery-imageN rounded-2 w-100"
                                    src={image}
                                    alt={`${name} gallery ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="details-parent-container row">
                <div className="details col-12 col-lg-7">
                    <div className="place-name my-4 d-flex flex-column gap-4">
                        <div>
                            <h1 className="lh-1">{name}</h1>
                            <h3>{location}</h3>
                        </div>
                        <span className="badge rounded-pill  host-view-property-badgeN align-self-start">
                            Private Resort
                        </span>
                    </div>

                    <hr className="host-view-property-dividerN my-4" />

                    <div className="information">
                        <h2 className="rate-title mb-2">Booking &amp; Schedule</h2>
                        <table className="rate-table">
                            <tbody>
                                <tr>
                                    <td>Day Tour</td>
                                    <td>{tours?.day ? `${tours.day.checkIn} - ${tours.day.checkOut}` : '8:00 AM - 5:00 PM'}</td>
                                </tr>
                                <tr>
                                    <td>Overnight Tour</td>
                                    <td>{tours?.night ? `${tours.night.checkIn} - ${tours.night.checkOut}` : '5:00 PM - 3:00 PM (next day)'}</td>
                                </tr>
                                <tr>
                                    <td>Flexible</td>
                                    <td>{tours?.flexible ? `Starts ${tours.flexible.checkIns.join(' or ')} - Ends ${tours.flexible.checkOuts.join(' or ')}` : 'Starts 8:00 AM or 5:00 PM - Ends 5:00 PM'}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2 className="rate-title mb-2">Guest Accommodation</h2>
                        <table className="rate-table">
                            <tbody>
                                <tr>
                                    <td>The Property can accommodate 50 - 100 Guests</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Space for up to 30 cars</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

                        <p className="rate-desc">
                            {property?.description || `Enjoy a relaxing getaway at ${name}, a place where you can unwind, spend quality time with family and friends, and create memorable moments away from the everyday hustle.`}
                            {showMore && ' Discover a private retreat for your next celebration, gathering, or well-deserved escape.'}
                        </p>
                        <button
                            type="button"
                            className="btn btn-warning rounded-pill px-4"
                            onClick={() => setShowMore((value) => !value)}
                        >
                            {showMore ? 'Show less' : 'Show more'}
                        </button>
                    </div>

                    <hr className="host-view-property-dividerN my-4" />

                    <h2 className="detail-title">What this place offers</h2>
                    <div className="row small g-2">
                        {features.map(([left, right]) => (
                            <Fragment key={left}>
                                <div className="col-6">{left}</div>
                                <div className="col-6">{right}</div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="cottages my-4">
                        <h2 className="detail-title">Bedrooms</h2>
                        <div className="row g-3">
                            {bedrooms.map((bedroom) => (
                                <div className="col-6 col-lg-5" key={bedroom.name}>
                                    <img
                                        className="host-view-bedroom-imageN rounded-2 w-100"
                                        src={bedroom.photo || resortImage}
                                        alt={bedroom.name}
                                    />
                                    <h3 className="small mt-1 mb-0">{bedroom.name}</h3>
                                    <p className="host-view-property-descriptionN mb-0">{bedroomDescription(bedroom)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="col-12 col-lg-5 my-4 position-sticky align-self-start">
                    <div className="host-view-property-actionsN rounded-4 p-3">
                        <button
                            type="button"
                            className="btn btn-warning rounded-pill w-100 mb-2"
                            onClick={onViewBookings}
                        >
                            View Bookings
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning rounded-pill w-100 mb-3"
                            onClick={onViewReviews}
                        >
                            View Reviews
                        </button>

                        <hr />

                        <button
                            type="button"
                            className="btn btn-warning rounded-pill w-100 mb-2"
                            onClick={onEdit}
                        >
                            Edit Property
                        </button>
                        <button
                            type="button"
                            className="btn host-view-property-deleteN rounded-pill w-100"
                            onClick={onDelete}
                        >
                            Delete Property
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    )
}