import { useState } from 'react'

const bookingStatuses = [
    { status: 'Confirmed', detail: '10/26/26' },
    { status: 'Pending', detail: 'Mj Massalang or -' },
    { status: 'Completed', detail: '10/26/26' },
    { status: 'Cancelled', detail: 'Mj Massalang or -' },
]

export function AdminReports() {
    const [property, setProperty] = useState('')
    const [startDate, setStartDate] = useState('2026-10-21')
    const [endDate, setEndDate] = useState('2026-10-23')

    const exportReport = () => {
        const rows = [
            ['Report', 'Reports and Analytics'],
            ['Property', property || 'All Property'],
            ['Start Date', startDate],
            ['End Date', endDate],
            [],
            ['Booking Status', 'Details'],
            ...bookingStatuses.map(({ status, detail }) => [status, detail]),
            [],
            ['Booking Revenue', '₱850,000'],
            ['Total Bookings', '5,000'],
        ]

        const csv = rows
            .map((row) =>
                row
                    .map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`)
                    .join(',')
            )
            .join('\n')

        const url = URL.createObjectURL(
            new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        )
        const link = document.createElement('a')
        link.href = url
        link.download = 'reports-and-analytics.csv'
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <section className="admin-reportsN container-fluid p-3 p-md-4">
            <div className="row align-items-center g-3 mb-4">
                <div className="col">
                    <h1 className="h2 fw-bold mb-0">Reports and Analytics</h1>
                </div>

                <div className="col-12 col-md-auto">
                    <select
                        className="form-select admin-report-propertyN"
                        aria-label="Select property"
                        value={property}
                        onChange={(event) => setProperty(event.target.value)}
                    >
                        <option value="">All Property</option>
                        <option value="Fabian's Azzure">Fabian's Azzure</option>
                        <option value="Sirena Resort">Sirena Resort</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label small mb-1" htmlFor="report-start-date">
                    Date
                </label>
                <div className="d-flex flex-wrap gap-2">
                    <input
                        id="report-start-date"
                        className="form-control admin-report-dateN"
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                    <input
                        className="form-control admin-report-dateN"
                        type="date"
                        aria-label="End date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                </div>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-12 col-lg-9">
                    <article className="card admin-report-statN h-100">
                        <div className="card-body">
                            <h2 className="h5 card-title">Booking Revenue</h2>
                            <p className="display-5 fw-bold mb-0">₱850,000</p>
                        </div>
                    </article>
                </div>
                <div className="col-12 col-lg-3">
                    <article className="card admin-report-statN h-100">
                        <div className="card-body">
                            <h2 className="h5 card-title">Total Bookings</h2>
                            <p className="display-5 fw-bold mb-0">5,000</p>
                        </div>
                    </article>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-9">
                    <article className="card admin-report-statusN">
                        <div className="card-body">
                            <h2 className="h5 card-title mb-3">Booking Status</h2>
                            <ul className="list-group list-group-flush">
                                {bookingStatuses.map(({ status, detail }) => (
                                    <li
                                        key={status}
                                        className="list-group-item d-flex justify-content-between gap-3 px-0"
                                    >
                                        <span>{status}</span>
                                        <span className="text-end">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    <button
                        type="button"
                        className="btn admin-report-exportN mt-3"
                        onClick={exportReport}
                    >
                        Export
                    </button>
                </div>
            </div>
        </section>
    )
}