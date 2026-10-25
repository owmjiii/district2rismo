import { useLocation, useNavigate } from 'react-router-dom'
import { AdminNavbar } from '../components/AdminSide/AdminNavbar.jsx'
import { AdminReservationDetails } from '../components/AdminSide/AdminReservationDetials.jsx'

export function AdminReservationDetailsPage({ preview = false }) {
    const { state } = useLocation()
    const navigate = useNavigate()
    const booking = state?.booking
    const listPath = preview ? '/admin-preview' : '/admin'
    const returnToList = () => navigate(listPath, { state: { section: 'Reservation Management' } })

    if (!booking) {
        return (
            <div className="admin-shellN">
                <AdminNavbar activeSection="Reservation Management" preview={preview} />
                <main className="container py-5 text-light" role="alert">
                    Reservation details are unavailable. Open a reservation from the admin list.
                    <button type="button" className="btn btn-warning rounded-pill ms-3" onClick={returnToList}>
                        Return to Reservations
                    </button>
                </main>
            </div>
        )
    }

    return (
        <div className="admin-shellN">
            <AdminNavbar activeSection="Reservation Management" preview={preview} />
            <main className="container-fluid px-0">
                <div className="admin-content-scrollN flex-grow-1">
                    <AdminReservationDetails booking={booking} onBack={returnToList} />
                </div>
            </main>
        </div>
    )
}
