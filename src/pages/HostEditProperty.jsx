import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { HostNavBar } from '../components/HostSide/HostNavBar.jsx'
import { HostAddProperty } from './HostAddProperty.jsx'

export function HostEditPropertyPage() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const property = state?.property

    const returnToProperty = (updatedProperty = property) => {
        navigate('/host/view-property', { state: { property: updatedProperty } })
    }

    return (
        <div className="account-pageN">
            <HostNavBar
                activeSection="Edit Property"
                onSelect={(section) => navigate('/host', { state: { section } })}
            />

            {property ? (
                <HostAddProperty
                    mode="edit"
                    property={property}
                    onBack={() => returnToProperty()}
                    onNext={(updatedProperty) => returnToProperty(updatedProperty)}
                />
            ) : (
                <main className="container py-5 text-light" role="alert">
                    Property details are missing. Return to Properties and select a property to edit.
                    <button
                        type="button"
                        className="btn btn-warning rounded-pill ms-3"
                        onClick={() => navigate('/host', { state: { section: 'Properties' } })}
                    >
                        Return to Properties
                    </button>
                </main>
            )}

            <Footer />
        </div>
    )
}
