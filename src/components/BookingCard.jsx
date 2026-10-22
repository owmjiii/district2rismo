import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const guestTypes = [
    { key: 'adult', label: 'Adult', price: 200 },
    { key: 'kids', label: 'Kids (Below 4 Feet)', price: 180 },
    { key: 'senior', label: 'Senior', price: 160 },
]

const sessions = ['Day Tour', 'Night Tour', 'Flexible']

const peso = (n) =>
    n.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })

function MinusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
        </svg>
    )
}

function PlusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
        </svg>
    )
}

function BookingCard({ cottages = [], resort }) {
    const navigate = useNavigate()
    const today = new Date().toISOString().split('T')[0]

    const [guests, setGuests] = useState({ adult: 6, kids: 3, senior: 0 })
    const [session, setSession] = useState(sessions[0])
    const [date, setDate] = useState(today)
    const [cottageId, setCottageId] = useState(cottages[0]?.id ?? '')

    const changeGuest = (key, delta) => {
        setGuests(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }))
    }

    const guestsTotal = guestTypes.reduce((sum, g) => sum + guests[g.key] * g.price, 0)
    const cottage = cottages.find(c => c.id === Number(cottageId))
    const cottagePrice = typeof cottage?.price === 'number' ? cottage.price : 0
    const total = guestsTotal + cottagePrice

    const summaryText =
        `${guests.adult} Adult${guests.adult === 1 ? '' : 's'}, ` +
        `${guests.kids} Kid${guests.kids === 1 ? '' : 's'}, ` +
        `${guests.senior} Senior`

    const handleBook = () => {
        navigate('/pay', {
            state: {
                booking: {
                    guests,
                    session,
                    date,
                    cottage: cottage ? { name: cottage.name, price: cottage.price } : null,
                    total,
                    resort,
                },
            },
        })
    }

    return (
        <div className='booking-card'>
            <h4 className='booking-heading'>Guests</h4>
            <div className='guest-list'>
                {guestTypes.map(g => (
                    <div className='guest-row' key={g.key}>
                        <span>{g.label}, ({peso(g.price).replace('.00', '')})</span>
                        <div className='counter'>
                            <button
                                type='button'
                                className='counter-btn'
                                onClick={() => changeGuest(g.key, -1)}
                                disabled={guests[g.key] === 0}
                                aria-label={`Remove one ${g.label}`}
                            >
                                <MinusIcon />
                            </button>
                            <span className='counter-value'>{guests[g.key]}</span>
                            <button
                                type='button'
                                className='counter-btn'
                                onClick={() => changeGuest(g.key, 1)}
                                aria-label={`Add one ${g.label}`}
                            >
                                <PlusIcon />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h4 className='booking-heading'>Session</h4>
            <select
                className='booking-input'
                value={session}
                onChange={e => setSession(e.target.value)}
            >
                {sessions.map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <h4 className='booking-heading'>Date</h4>
            <input
                type='date'
                className='booking-input'
                value={date}
                min={today}
                onChange={e => setDate(e.target.value)}
            />

            <hr className='summary-divider' />

            <div className='total-row'>
                <span>TOTAL</span>
                {/* LEGIT PRICE NG RESORT */}
                <span className='total-amount'>15,000.00</span>
            </div>

            <button
                type='button'
                className='book-btn'
                onClick={handleBook}
            >
                Book Now
            </button>

        </div>
    )
}

export default BookingCard