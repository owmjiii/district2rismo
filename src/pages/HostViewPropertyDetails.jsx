import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { HostNavBar } from '../components/HostSide/HostNavBar.jsx'
import { HostViewProperty } from '../components/HostSide/ViewPropertyDetails/HostViewProperty.jsx'

export function HostViewPropertyPage() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const property = state?.property

    return (
        <div className="account-pageN">
            <HostNavBar
                activeSection="View Property"
                onSelect={(section) => navigate('/host', { state: { section } })}
            />

            <main className="account-mainN container-fluid px-0">
                {property ? (
                    <HostViewProperty
                        property={property}
                        onBack={() => navigate('/host/properties')}
                            onEdit={() => navigate('/host/edit-property', { state: { property } })}
                        />
                ) : (
                    <div className="container py-5 text-light" role="alert">
                        Property details are missing. Return to Properties and select a property.
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}