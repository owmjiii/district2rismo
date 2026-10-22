import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import BaliwagHero from '../images/Baliwag Hero.png'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'


function ConfirmPayment() {
    const [step, setStep] = useState(1)
    const [payOption, setPayOption] = useState('full')
    const [method, setMethod] = useState('gcash')

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

                    <Link className='icon' to='/resorts/:id'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
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
                                    <button className='button next-btn' onClick={() => setStep(2)}>Next</button>
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

                                <div className='d-flex justify-content-end'>
                                    <button className='button next-btn'>Book Now</button>
                                </div>
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
                                    <h3 className='summary-name'>Galilee Wonderland Resort</h3>
                                    <span className='summary-town'>Bustos, Bulacan</span>
                                    <small className='d-block pay-note'>★ 4.7 (246 Reviews)</small>
                                </div>
                            </div>

                            <h4 className='field-label'>Guests</h4>
                            <div className='guest-row d-flex justify-content-between align-items-center'>
                                <span>Adults, (Age 13+)</span>
                                <div className='counter d-flex align-items-center gap-2'>
                                    <button aria-label='Decrease adults'>−</button>
                                    <span>6</span>
                                    <button aria-label='Increase adults'>+</button>
                                </div>
                            </div>
                            <div className='guest-row d-flex justify-content-between align-items-center'>
                                <span>Kids, (Ages 2-12)</span>
                                <div className='counter d-flex align-items-center gap-2'>
                                    <button aria-label='Decrease kids'>−</button>
                                    <span>3</span>
                                    <button aria-label='Increase kids'>+</button>
                                </div>
                            </div>
                            <div className='guest-row d-flex justify-content-between align-items-center'>
                                <span>Infants, (Under 2)</span>
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
                                <span className='total-price'>₱2,740.00</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ConfirmPayment