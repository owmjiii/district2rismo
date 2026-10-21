import { useState } from 'react'

export const SignUpN = ({ onBack, onClose, onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit?.(Object.fromEntries(new FormData(event.currentTarget)))
    }

    return (
        <section className="signup-cardN position-relative container px-4 pt-2 pb-4 px-md-5 pt-md-3 pb-md-5 rounded-5 shadow text-white">
            
            <div className="d-flex align-items-center justify-content-between mb-4">
                <button type="button" className="btn btn-link text-white text-decoration-none p-0 fs-3" aria-label="Go back" onClick={onBack}>←</button>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose} />
            </div>

            <h1 className="h3 fw-bold text-center mb-2">Create your account</h1>
            <p className="text-center signup-mutedN mb-4">This information is required to book or host.</p>

            <form className="vstack gap-3" onSubmit={handleSubmit}>
                <fieldset>
                    <legend className="h6 fw-bold mb-2">Legal name</legend>
                    <div className="signup-name-fieldsN">
                        <input className="form-control signup-inputN rounded-top-3 rounded-bottom-0" type="text" name="firstName" placeholder="First name" autoComplete="given-name" required />
                        <input className="form-control signup-inputN rounded-bottom-3 rounded-top-0" type="text" name="lastName" placeholder="Last name" autoComplete="family-name" required />
                    </div>
                    <small className="signup-mutedN">Use the name shown on your government ID.</small>
                </fieldset>

                <div>
                    <label className="form-label fw-bold" htmlFor="signup-birth-date">Date of birth</label>
                    <input id="signup-birth-date" className="form-control form-control-lg signup-inputN" type="date" name="dateOfBirth" autoComplete="bday" required />
                </div>

                <div>
                    <label className="form-label fw-bold" htmlFor="signup-password">Password</label>
                    <div className="input-group">
                        <input id="signup-password" className="form-control form-control-lg signup-inputN" type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" required />
                        <button className="btn btn-outline-warning" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
                    </div>
                </div>

                <div className="signup-promoN rounded-3 p-3">
                    <p className="small mb-2">We may send you updates, deals, and account news. You can change your preferences anytime.</p>
                    <div className="form-check">
                        <input className="form-check-input" id="signup-no-promotions" type="checkbox" name="noPromotions" value="true" />
                        <label className="form-check-label small" htmlFor="signup-no-promotions">I don’t want to receive promotional emails.</label>
                    </div>
                </div>

                <p className="small signup-mutedN mb-0">By selecting <strong>Agree and continue</strong>, you agree to our <a className="signup-linkN" href="#">Terms of Service</a> and acknowledge our <a className="signup-linkN" href="#">Privacy Policy</a>.</p>

                <button className="btn btn-warning btn-lg w-100 fw-bold mt-2" type="submit">Agree and continue</button>
            </form>
        </section>
    )
}