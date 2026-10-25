import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { HostNavBar } from '../components/HostSide/HostNavBar.jsx'
import { HostBookingDetailsN } from '../components/HostSide/HostBookingDetailsN.jsx'

export function ConfirmBooking() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const booking = state?.booking

    return (
        <div className="account-pageN">
            <HostNavBar
                activeSection="Confirm Booking"
                onSelect={() => navigate('/host')}
            />

            <main className="account-mainN container-fluid px-0">
                <div className="row g-0">
                    <div className="col-12">
                        {booking ? (
                            <HostBookingDetailsN
                                booking={booking}
                                onBack={() => navigate('/host/bookings')}
                                onConfirm={() => console.log('Confirm booking:', booking)}
                                onReject={() => console.log('Reject booking:', booking)}
                            />
                        ) : (
                            <div className="container py-5 text-light" role="alert">
                                Booking details are missing. Return to Bookings and select a booking.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
