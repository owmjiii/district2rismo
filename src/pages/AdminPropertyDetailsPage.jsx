import { useLocation, useNavigate } from 'react-router-dom'
import { AdminPropertyDetails } from '../components/AdminSide/AdminPropertyDetails.jsx'
import { AdminNavbar } from '../components/AdminSide/AdminNavbar.jsx'

export function AdminPropertyDetailsPage({ preview = false }) {
    const { state } = useLocation()
    const navigate = useNavigate()
    const property = state?.property

    if (!property) {
        return (
            <main className="container py-5">
                <p>Property details are unavailable. Open a property from the admin list.</p>
                <button type="button" className="btn btn-primary" onClick={() => navigate(preview ? "/admin-preview" : "/admin")}>
                    Back to Admin
                </button>
            </main>
        )
    }

    return (
        <div className="admin-shellN">
            <AdminNavbar
                activeSection="Property Management"
                preview={preview}
            />
            <main className="container-fluid px-0">
                <div className="admin-content-scrollN flex-grow-1">
                    <AdminPropertyDetails
                        property={property}
                        onBack={() => navigate(preview ? '/admin-preview' : '/admin')}
                    />
                </div>
            </main>
        </div>
    )
}


