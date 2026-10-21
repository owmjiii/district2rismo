import logo from '../../images/2Rismo Logo.png'
import { useState } from 'react'
import { EmailOTPN } from './EmailOTPN.jsx'
import { SignUpN } from './SignUpN.jsx'

export const LoginN = ({ onClose }) => {

    const [email, setEmail] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)

    const handleContinue = (event) => {
        event.preventDefault()
        setShowOtp(true)
    }

    if (showSignUp) {
        return <SignUpN onBack={() => setShowSignUp(false)} onClose={onClose} />
    }

    if (showOtp) {
        return (
            <EmailOTPN email={email} onBack={() => setShowOtp(false)} onClose={onClose} onResend={() => { }} onVerify={(code) => {setShowSignUp(true)}} />
        )
    }

    return (
        <div className="login-cardN  rounded-5 shadow p-4 p-md-5">
            <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" aria-label="Close" onClick={onClose}
            />
            <img src={logo} alt="Logo" className="login-logoN mb-3" />
            <h1 className="h2N color fw-bold text-center mb-4 text-white">Log in or sign up</h1>
            <form onSubmit={handleContinue}>
                <input className="form-controlN form-control-lg mb-2" type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                <p className="smallN text-secondary mb-0">
                    We’ll send a confirmation code by text or email. Message and data rates apply.
                </p >
                <a className="smallN text-white fw-semibold" href="#">
                    Privacy Policy
                </a>
                <button className="btn continue-buttonN btn-lg w-100 fw-semibold mt-4 text-black" type="submit">
                    Continue
                </button>
            </form>
        </div>
    )
}