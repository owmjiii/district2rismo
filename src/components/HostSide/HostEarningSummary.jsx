import resortImage from '../../images/Bustos Hero.png'
import { useState } from 'react'

const transactions = [
    { id: 1, resort: 'Fabian’s Azzure Private Resort', booking: '#00001', date: 'Oct 21, 2026', amount: '5,000.00' },
    { id: 2, resort: 'Fabian’s Azzure Private Resort', booking: '#00001', date: 'Oct 21, 2026', amount: '5,000.00' },
    { id: 3, resort: 'Fabian’s Azzure Private Resort', booking: '#00001', date: 'Oct 21, 2026', amount: '5,000.00' },
]

export const HostEarningSummary = () => {
    const [period, setPeriod] = useState('This Month')

    return (
        <section className="host-earningN container-fluid p-3 p-md-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <h1 className="h2 fw-bold text-warning mb-0">Earning Summary</h1>
                <select
                    className="form-select host-earning-periodN rounded-pill"
                    aria-label="Choose earnings period"
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                >
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
            </div>

            <h2 className="small host-earning-headingN mb-2">Overview</h2>

            <article className="card host-earning-cardN border-0 rounded-4 p-3 p-md-4 mb-3">
                <h2 className="h5 fw-semibold mb-2">Total Earnings</h2>
                <p className="display-5 fw-bold text-warning mb-0">₱67,000.00</p>
            </article>

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                    <article className="card host-earning-cardN border-0 rounded-4 h-100 p-3">
                        <h2 className="h5 fw-semibold mb-1">Net Earnings</h2>
                        <p className="h2 fw-bold mb-0">₱65,000.00</p>
                        <small>After ₱2,000 platform fees</small>
                    </article>
                </div>

                <div className="col-12 col-md-6">
                    <article className="card host-earning-cardN border-0 rounded-4 h-100 p-3">
                        <h2 className="h5 fw-semibold mb-1">Completed Bookings</h2>
                        <p className="display-6 fw-bold mb-0">13</p>
                    </article>
                </div>
            </div>

            <h2 className="small host-earning-headingN mb-2">Recent Transactions</h2>

            <div className="d-flex flex-column gap-2">
                {transactions.map((transaction) => (
                    <article
                        key={transaction.id}
                        className="host-transactionN d-flex align-items-center gap-2 gap-md-3 rounded-3 p-2"
                    >
                        <img
                            className="host-transaction-imageN rounded-2 flex-shrink-0"
                            src={resortImage}
                            alt={transaction.resort}
                        />

                        <div className="flex-grow-1">
                            <h3 className="h6 fw-semibold mb-0">{transaction.resort}</h3>
                            <p className="small text-warning mb-0">
                                {transaction.booking} · {transaction.date}
                            </p>
                        </div>

                        <span className="small text-warning text-nowrap">
                            +{transaction.amount}
                        </span>
                    </article>
                ))}
            </div>
        </section>
    )
}