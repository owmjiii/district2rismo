import { useState } from 'react'

const users = [
    { name: 'Mj Massalang', email: 'mjmassalang24@gmail.com', status: 'Active' },
    { name: 'Nheil Ryan', email: 'nheil@gmail.com', status: 'Suspended' },
]

const filters = ['All', 'Active', 'Suspended', 'Deactivated']

export function AdminUsers({ onViewDetails }) {
    const [activeFilter, setActiveFilter] = useState('All')
    const [search, setSearch] = useState('')

    const filteredUsers = users.filter((user) => {
        const matchesFilter = activeFilter === 'All' || user.status === activeFilter
        const query = search.toLowerCase()
        const matchesSearch =
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)

        return matchesFilter && matchesSearch
    })

    return (
        <section className="admin-usersN container-fluid p-3 p-md-4">
            <h1 className="h2 fw-bold mb-4">Users</h1>

            <div className="row align-items-center g-3 mb-4">
                <div className="col-12 col-xl-8">
                    <div className="d-flex flex-wrap gap-2" role="group" aria-label="Filter users">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                className={`btn admin-user-filterN ${activeFilter === filter ? 'active' : ''
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
                    <div className="input-group admin-users-searchN">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search User"
                            aria-label="Search users"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <span className="input-group-text">
                            <i className="bi bi-search" aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </div>

            <p className="small mb-2">10,000 Users</p>

            <div className="d-flex flex-column gap-2">
                {filteredUsers.map((user) => (
                    <article
                        key={user.email}
                        className="admin-user-rowN row align-items-center g-2 rounded-3 p-2"
                    >
                        <div className="col-auto">
                            <span className="admin-user-avatarN rounded-circle d-flex align-items-center justify-content-center">
                                {user.name.charAt(0)}
                            </span>
                        </div>

                        <div className="col">
                            <h2 className="h6 mb-0">{user.name}</h2>
                            <p className="small text-warning mb-0">{user.email}</p>
                        </div>

                        <div className="col-12 col-sm-auto col-md-3 text-sm-center">
                            <span
                                className={`badge rounded-pill admin-user-statusN ${user.status === 'Active' ? 'active' : ''
                                    }`}
                            >
                                {user.status}
                            </span>
                        </div>

                        <div className="col-12 col-sm-auto text-sm-end">
                            <button
                                type="button"
                                className="btn admin-user-detailsN"
                                onClick={() => onViewDetails(user)}
                            >
                                View Details
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}