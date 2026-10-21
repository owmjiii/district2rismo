import React from 'react'
import Logo from '../images/Footer Logo.png'

function Footer() {
    return (
        <div className='footer-container py-3'>

            <div className='row'>

                <div className='logo-container col-lg-5 col-12'>
                    <img src={Logo} alt="" />
                    <h2>Bulacan District 2 Hotels
                        and Resorts</h2>
                </div>

                <div className='links-container col-lg-7 col-12 mt-5'>

                    <div className='footer-links'>
                        <span className='link-title'>Municipalities</span>
                        <div className='d-flex flex-column'>
                            <span className='link'>Baliwag, Bulacan</span>
                            <span className='link'>Bustos, Bulacan</span>
                            <span className='link'>Plaridel, Bulacan</span>
                        </div>
                    </div>
                    <div className='footer-links'>
                        <span className='link-title'>Get Involved</span>
                        <div className='d-flex flex-column'>
                            <span className='link'>List Your Property</span>
                            <span className='link'>Contact Us</span>
                            <span className='link'>Submit a Suggestion</span>
                        </div>
                    </div>
                    <div className='footer-links'>
                        <span className='link-title'>Information</span>
                        <div className='d-flex flex-column'>
                            <span className='link'>Privacy Policy</span>
                            <span className='link'>Terms of Use</span>
                            <span className='link'>Disclaimer</span>
                        </div>
                    </div>

                </div>

                <hr className='my-4 w-75 m-auto border-2'/>

                <span className='copyright'>© 2026 District 2rismo. All rights reserved.</span>

            </div>

        </div>
    )
}

export default Footer