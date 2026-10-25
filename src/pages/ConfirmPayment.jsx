import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import BaliwagHero from '../images/Baliwag Hero.png'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import StripePaymentN from '../components/StripePaymentN.jsx'
import PaymenSuccessfulStripe from '../components/PaymenSuccessfulStripe.jsx'


const PENDING_PAYMENT_STORAGE_KEY = 'district2rismo.pendingPayment'

function readPendingPayment() {
    try {
        return JSON.parse(sessionStorage.getItem(PENDING_PAYMENT_STORAGE_KEY) || 'null')
    } catch {
        return null
    }
}

function ConfirmPayment() {
    const location = useLocation()
    const { state } = location
    const sessionId = new URLSearchParams(location.search).get('session_id')
    const [pendingPayment, setPendingPayment] = useState(() =>
        state?.booking ? { booking: state.booking } : readPendingPayment()
    )
    const booking = state?.booking || pendingPayment?.booking
    const [step, setStep] = useState(() => sessionId ? 3 : (pendingPayment?.step || 1))
    const [payOption, setPayOption] = useState(() => pendingPayment?.payOption || 'full')
    const [method, setMethod] = useState(() => pendingPayment?.method || 'gcash')
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
    const [paymentResult, setPaymentResult] = useState({
        loading: Boolean(sessionId),
        error: '',
        status: '',
        paymentStatus: '',
    })

    useEffect(() => {
        if (!sessionId) return

        const controller = new AbortController()

        async function verifyPayment() {
            setPaymentResult({
                loading: true,
                error: '',
                status: '',
                paymentStatus: '',
            })

            try {
                const apiUrl =
                    import.meta.env.VITE_PAYMENT_API_URL || 'http://localhost:4242'
                const response = await fetch(
                    `${apiUrl}/verify-checkout-session?session_id=${encodeURIComponent(sessionId)}`,
                    { signal: controller.signal }
                )
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Could not verify payment.')
                }

                setPaymentResult({
                    loading: false,
                    error: '',
                    status: data.status,
                    paymentStatus: data.payment_status,
                })
                setShowPaymentSuccess(data.payment_status === 'paid')
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setPaymentResult({
                        loading: false,
                        error: error.message || 'Could not verify payment.',
                        status: '',
                        paymentStatus: '',
                    })
                }
            }
        }

        verifyPayment()
        return () => controller.abort()
    }, [sessionId])

    useEffect(() => {
        if (!booking) return
        const savedPayment = { booking, step, payOption, method }
        sessionStorage.setItem(PENDING_PAYMENT_STORAGE_KEY, JSON.stringify(savedPayment))
        setPendingPayment(savedPayment)
    }, [booking, step, payOption, method])

    if (!booking) {
        return <p>Booking details are missing. Please start your booking again.</p>
    }

    const guests = booking?.guests

    const total =
        (guests?.adult || 0) * 200 +
        (guests?.kids || 0) * 180 +
        (guests?.senior || 0) * 160 +
        (typeof booking?.cottage?.price === 'number'
            ? booking.cottage.price
            : 0)

    const money = (amount) =>
        `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`

    // Pwedeng bumalik sa step na natapos na, pero hindi lumaktaw pasulong
    const goTo = (n) => {
        if (n < step) setStep(n)
    }

    const methods = [
        { key: 'gcash', label: 'GCash' },
        { key: 'maya', label: 'Maya' },
        { key: 'card', label: 'Credit / Debit Card' },
    ]

    return (
        <div>
            <Header />

            <div className='pay-page container-fluid px-3 px-md-5'>

                <div className='d-flex align-items-center gap-3 mb-4'>

                    <Link className='payment-back-button' to='/resorts/:id' aria-label='Go back'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
                        </svg>
                    </Link>

                    <h1 className='pay-title m-0'>Confirm and Pay</h1>
                </div>

                <div className='row g-4 d-flex flex-wrap-reverse'>

                    <div className='col-12 col-lg-7'>

                        {/* STEP 1 */}
                        {step === 1 ? (
                            <div className='pay-card mb-3'>
                                <h2 className='step-title'>1. Choose when to pay</h2>

                                <label className='pay-option d-flex justify-content-between align-items-center'>
                                    <span>Pay ₱2,740.00 now</span>
                                    <input
                                        type='radio'
                                        name='payOption'
                                        checked={payOption === 'full'}
                                        onChange={() => setPayOption('full')}
                                    />
                                </label>

                                <hr className='pay-divider' />

                                <label className='pay-option d-flex justify-content-between align-items-center'>
                                    <div>
                                        <span>Pay part now, part later</span>
                                        <small className='d-block pay-note'>
                                            ₱1,370.00 now, ₱1,370.00 charged on Oct 24. No extra fees.
                                        </small>
                                    </div>
                                    <input
                                        type='radio'
                                        name='payOption'
                                        checked={payOption === 'partial'}
                                        onChange={() => setPayOption('partial')}
                                    />
                                </label>

                                <hr className='pay-divider' />

                                <div className='d-flex justify-content-end'>
                                    <button
                                        type='button'
                                        className='button next-btn'
                                        onClick={() => setStep(2)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className='pay-card pay-card-collapsed clickable mb-3'
                                onClick={() => goTo(1)}
                            >
                                <h2 className='step-title m-0'>1. Choose when to pay</h2>
                            </div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 ? (
                            <div className='pay-card mb-3'>
                                <h2 className='step-title'>2. Add a payment method</h2>

                                {methods.map((m, i) => (
                                    <div key={m.key}>
                                        <label className='pay-option d-flex justify-content-between align-items-center'>
                                            <span>{m.label}</span>
                                            <input
                                                type='radio'
                                                name='method'
                                                checked={method === m.key}
                                                onChange={() => setMethod(m.key)}
                                            />
                                        </label>
                                        {i < methods.length - 1 && <hr className='pay-divider' />}
                                    </div>
                                ))}

                                <hr className='pay-divider' />

                                <div className='d-flex justify-content-end'>
                                    <button className='button next-btn' onClick={() => setStep(3)}>Next</button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`pay-card pay-card-collapsed mb-3${step > 2 ? ' clickable' : ''}`}
                                onClick={() => goTo(2)}
                            >
                                <h2 className='step-title m-0'>2. Add a payment method</h2>
                            </div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 ? (
                            <div className='pay-card'>
                                <h2 className='step-title'>3. Review your reservation</h2>

                                <div className='guest-row d-flex justify-content-between'>
                                    <span>Payment</span>
                                    <span>{payOption === 'full' ? 'Pay in full' : 'Part now, part later'}</span>
                                </div>
                                <div className='guest-row d-flex justify-content-between'>
                                    <span>Method</span>
                                    <span>{methods.find(m => m.key === method).label}</span>
                                </div>

                                <hr className='pay-divider' />

                                {method === 'card' ? (
                                    sessionId ? (
                                        paymentResult.loading ? (
                                            <p role="status">Verifying your payment with Stripe...</p>
                                        ) : paymentResult.paymentStatus === 'paid' ? (
                                            <p>Your payment has been confirmed. See the confirmation popup.</p>
                                        ) : (
                                            <p className="payment-error" role="alert">
                                                {paymentResult.error || 'Payment was not confirmed. Please try again.'}
                                            </p>
                                        )
                                    ) : (
                                        <StripePaymentN booking={booking} payOption={payOption} />
                                    )
                                ) : (
                                    <p className="pay-note">
                                        {methods.find((item) => item.key === method).label} payments
                                        are not connected yet. Choose Credit / Debit Card to pay with Stripe.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className='pay-card pay-card-collapsed'>
                                <h2 className='step-title m-0'>3. Review your reservation</h2>
                            </div>
                        )}
                    </div>

                    <div className='col-12 col-lg-5'>
                        <div className='pay-card summary-card'>

                            <div className='d-flex gap-3 mb-4'>
                                <img className='summary-img' src={BaliwagHero} alt='Galilee Wonderland Resort' />
                                <div>
                                    <h3 className="summary-name">{booking.resort.name}</h3>
                                    <span className="summary-town">{booking.resort.location}</span>
                                    <small className='d-block pay-note'>★ 4.7 (246 Reviews)</small>
                                </div>
                            </div>

                            <h4 className='field-label'>Guests</h4>
                            <div className='guest-row d-flex justify-content-between align-items-center'>
                                <span className='guest-label'>Adults, (Age 13+)</span>
                                <div className='counter d-flex align-items-center gap-2'>
                                    <button aria-label='Decrease adults'>−</button>
                                    <span>6</span>
                                    <button aria-label='Increase adults'>+</button>
                                </div>
                            </div>
                            <div className='guest-row d-flex justify-content-between align-items-center'>
                                <span className='guest-label'>Kids, (Ages 2-12)</span>
                                <div className='counter d-flex align-items-center gap-2'>
                                    <button aria-label='Decrease kids'>−</button>
                                    <span>3</span>
                                    <button aria-label='Increase kids'>+</button>
                                </div>
                            </div>
                            <div className='guest-row d-flex justify-content-between align-items-center'>
                                <span className='guest-label'>Infants, (Under 2)</span>
                                <div className='counter d-flex align-items-center gap-2'>
                                    <button aria-label='Decrease infants' disabled>−</button>
                                    <span>0</span>
                                    <button aria-label='Increase infants'>+</button>
                                </div>
                            </div>

                            <h4 className='field-label mt-3'>Session</h4>
                            <select className='form-select pay-input'>
                                <option>Day Tour</option>
                                <option>Night Swimming</option>
                                <option>Overnight</option>
                            </select>

                            <h4 className='field-label mt-3'>Date</h4>
                            <input type='date' className='form-control pay-input' defaultValue='2026-10-28' />

                            <hr className='pay-divider my-4' />

                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <span className='total-label'>TOTAL</span>
                                <span className="total-price">{money(total)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <PaymenSuccessfulStripe
                show={showPaymentSuccess}
                onHide={() => setShowPaymentSuccess(false)}
                onReturnHome={() => sessionStorage.removeItem(PENDING_PAYMENT_STORAGE_KEY)}
            />
            <Footer />
        </div>
    )
}

export default ConfirmPayment




