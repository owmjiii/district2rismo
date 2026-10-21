import { useState } from 'react'
import { SignUpN } from './SignUpN.jsx'

export const EmailOTPN = ({ email, onBack, onClose, onResend, onVerify }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const code = new FormData(event.currentTarget).get('otp')
        onVerify?.(code)
    }

    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <section className="email-otp-cardN container p-4 p-md-5 rounded-5 shadow text-white" aria-labelledby="email-otp-title">
            <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-link text-white text-decoration-none p-0 fs-3" aria-label="Go back" onClick={onBack}>  ←  </button>

                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose} />
            </div>

            <h1 id="email-otp-title" className="h2 fw-bold text-center mt-4 mb-2">
                Confirm your email
            </h1>

            <p className="text-center mb-4">
                We sent a code to <strong>{email}</strong>.
            </p>

            <form className="mx-auto" style={{ maxWidth: '360px' }} onSubmit={handleSubmit}>
                <label className="visually-hidden" htmlFor="email-otp-code">
                    Six-digit verification code
                </label>

                <input id="email-otp-code" name="otp" className="form-control form-control-lg email-otp-inputN text-center" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} placeholder="------" required />

                <button className="btn btn-warning w-100 fw-semibold mt-4" type="button" onClick={() => onVerify?.('preview')}>
                    Verify email
                </button>
            </form>

            <p className="text-center mt-4 mb-0">
                Didn’t get it?{' '}
                <button type="button" className="btn btn-link email-otp-linkN p-0 fw-semibold" onClick={onResend}
                >
                    Send a new code
                </button>
            </p>
        </section>
    )
}