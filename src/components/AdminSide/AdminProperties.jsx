import { useState } from 'react'
import resortImage from '../../images/Bustos Hero.png'

const properties = [
    { name: 'Villa Sirena', owner: 'Nheil Ryan Adriano', status: 'Pending' },
    { name: 'Fabian’s Azzure', owner: 'Gian Manalaysay', status: 'Approved' },
]

const filters = ['All', 'Pending', 'Approved', 'Hidden']

export function AdminProperties({ onViewDetails }) {
    const [activeFilter, setActiveFilter] = useState('All')
    const [search, setSearch] = useState('')

    const filteredProperties = properties.filter((property) => {
        const matchesFilter =
            activeFilter === 'All' || property.status === activeFilter
        const query = search.trim().toLowerCase()
        const matchesSearch =
            property.name.toLowerCase().includes(query) ||
            property.owner.toLowerCase().includes(query)

        return matchesFilter && matchesSearch
    })

    return (
        <section className="admin-propertiesN container-fluid p-3 p-md-4">
            <h1 className="h2 fw-bold mb-4">Properties</h1>

            <div className="row align-items-center g-3 mb-4">
                <div className="col-12 col-xl-8">
                    <div
                        className="d-flex flex-wrap gap-2"
                        role="group"
                        aria-label="Filter properties"
                    >
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                className={`btn admin-host-filterN ${
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

                <div className="col-12 col-xl-4">
                    <div className="input-group admin-host-searchN">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search Property"
                            aria-label="Search properties"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <span className="input-group-text">
                            <i className="bi bi-search" aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </div>

            <p className="small mb-2">26 Properties</p>

            <div className="d-flex flex-column gap-2">
                {filteredProperties.map((property) => (
                    <article
                        className="admin-property-rowN row align-items-center g-2 rounded-3 p-2"
                        key={property.name}
                    >
                        <div className="col-auto">
                            <img
                                className="admin-property-imageN rounded-2"
                                src={resortImage}
                                alt=""
                            />
                        </div>

                        <div className="col">
                            <h2 className="h6 mb-0">{property.name}</h2>
                            <p className="small text-warning mb-0">
                                By {property.owner}
                            </p>
                        </div>

                        <div className="col-12 col-sm-auto col-md-3 text-sm-center">
                            <span
                                className={`badge rounded-pill admin-property-statusN ${
                                    property.status === 'Pending' ? 'pending' : ''
                                }`}
                            >
                                {property.status}
                            </span>
                        </div>

                        <div className="col-12 col-sm-auto text-sm-end">
                            <button
                                type="button"
                                className="btn admin-host-detailsN"
                                onClick={() => onViewDetails?.(property)}
                            >
                                View Details
                            </button>
                        </div>
                    </article>
                ))}

                {filteredProperties.length === 0 && (
                    <p className="text-center py-4 mb-0">
                        No properties match your search.
                    </p>
                )}
            </div>
        </section>
    )
}