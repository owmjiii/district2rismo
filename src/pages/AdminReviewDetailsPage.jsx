import { useLocation, useNavigate } from 'react-router-dom'
import { AdminNavbar } from '../components/AdminSide/AdminNavbar.jsx'
import { AdminReviewDetails } from '../components/AdminSide/AdminReviewDetails.jsx'

export function AdminReviewDetailsPage({ preview = false }) {
    const { state } = useLocation()
    const navigate = useNavigate()
    const review = state?.review
    const listPath = preview ? '/admin-preview' : '/admin'
    const returnToList = () => navigate(listPath, { state: { section: 'Reviews' } })

    if (!review) {
        return (
            <div className="admin-shellN">
                <AdminNavbar activeSection="Reviews" preview={preview} />
                <main className="container py-5 text-light" role="alert">
                    Review details are unavailable. Open a review from the admin list.
                    <button type="button" className="btn btn-warning rounded-pill ms-3" onClick={returnToList}>Return to Reviews</button>
                </main>
            </div>
        )
    }

    return (
        <div className="admin-shellN">
            <AdminNavbar activeSection="Reviews" preview={preview} />
            <main className="container-fluid px-0">
                <div className="admin-content-scrollN flex-grow-1">
                    <AdminReviewDetails review={review} onBack={returnToList} onDelete={returnToList} />
                </div>
            </main>
        </div>
    )
}
