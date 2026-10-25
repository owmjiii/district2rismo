import { useState } from 'react'

const hosts = [
    { name: 'Gian Manalaysay', email: 'gian@gmail.com', status: 'Verified' },
    { name: 'Ron Roberto', email: 'ronroberto@gmail.com', status: 'Unverified' },
]

const filters = ['All', 'Verified', 'Unverified']

export function AdminHost({ onViewDetails }) {
    const [activeFilter, setActiveFilter] = useState('All')
    const [search, setSearch] = useState('')

    const filteredHosts = hosts.filter((host) => {
        const matchesFilter = activeFilter === 'All' || host.status === activeFilter
        const query = search.trim().toLowerCase()
        const matchesSearch =
            host.name.toLowerCase().includes(query) ||
            host.email.toLowerCase().includes(query)

        return matchesFilter && matchesSearch
    })

    return (
        <section className="admin-hostsN container-fluid p-3 p-md-4">
            <h1 className="h2 fw-bold mb-4">Hosts</h1>

            <div className="row align-items-center g-3 mb-4">
                <div className="col-12 col-xl-8">
                    <div className="d-flex flex-wrap gap-2" role="group" aria-label="Filter hosts">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                className={`btn admin-host-filterN ${activeFilter === filter ? 'active' : ''}`}
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
                            placeholder="Search Host"
                            aria-label="Search hosts"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <span className="input-group-text">
                            <i className="bi bi-search" aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </div>

            <p className="small mb-2">5,000 Hosts</p>

            <div className="d-flex flex-column gap-2">
                {filteredHosts.map((host) => (
                    <article
                        className="admin-host-rowN row align-items-center g-2 rounded-3 p-2"
                        key={host.email}
                    >
                        <div className="col-auto">
                            <span className="admin-host-avatarN rounded-circle d-flex align-items-center justify-content-center">
                                {host.name.charAt(0)}
                            </span>
                        </div>

                        <div className="col">
                            <h2 className="h6 mb-0">{host.name}</h2>
                            <p className="small text-warning mb-0">{host.email}</p>
                        </div>

                        <div className="col-12 col-sm-auto col-md-3 text-sm-center">
                            <span className={`badge rounded-pill admin-host-statusN ${host.status === 'Unverified' ? 'unverified' : ''}`}>
                                {host.status}
                            </span>
                        </div>

                        <div className="col-12 col-sm-auto text-sm-end">
                            <button
                                type="button"
                                className="btn admin-host-detailsN"
                                onClick={() => onViewDetails?.(host)}
                            >
                                View Details
                            </button>
                        </div>
                    </article>
                ))}

                {filteredHosts.length === 0 && (
                    <p className="text-center py-4 mb-0">No hosts match your search.</p>
                )}
            </div>
        </section>
    )
}