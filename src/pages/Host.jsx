import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HostNavBar } from '../components/HostSide/HostNavBar.jsx'
import Footer from '../components/Footer.jsx'
import { HostSideBarN } from '../components/HostSide/HostSideBarN.jsx'
import { HostDashboardN } from '../components/HostSide/HostDashboardN.jsx'
import { HostNotificationN } from '../components/HostSide/HostNotificationN.jsx'
import { HostPropertiesN } from '../components/HostSide/HostPropertiesN.jsx'
import { HostBookingsN } from '../components/HostSide/HostBookingsN.jsx'
import { HostReviewsN } from '../components/HostSide/HostReviewsN.jsx'
import { HostEarningSummary } from '../components/HostSide/HostEarningSummary.jsx'
import { HostAddProperty } from './HostAddProperty.jsx'
import { HostSettingsN } from '../components/HostSide/HostSettingsN.jsx'
import { HostHelp } from '../components/HostSide/HostHelp.jsx'

export function HostN({ initialSection = 'Dashboard' }) {
    const [selectedSection, setSelectedSection] = useState(initialSection)
    const navigate = useNavigate()

    const showBookingDetails = (booking) => {
        navigate('/host/confirm-booking', { state: { booking } })
    }

    const isFullWidth = selectedSection === 'Add Property'

    return (
        <div className="account-pageN">
            <HostNavBar
                activeSection={selectedSection}
                onSelect={setSelectedSection}
            />

            <main className="account-mainN container-fluid px-0">
                <div className="row g-0">
                    {!isFullWidth && (
                        <div className="d-none d-lg-block col-lg-3">
                            <HostSideBarN
                                activeSection={selectedSection}
                                onSelect={setSelectedSection}
                            />
                        </div>
                    )}

                    <div className={isFullWidth ? 'col-12' : 'col-12 col-lg-9'}>
                        {selectedSection === 'Dashboard' ? (
                            <HostDashboardN />
                        ) : selectedSection === 'Notifications' ? (
                            <HostNotificationN />
                        ) : selectedSection === 'Properties' ? (
                            <HostPropertiesN
                                onAddProperty={() => setSelectedSection('Add Property')}
                            />
                        ) : selectedSection === 'Bookings' ? (
                            <HostBookingsN onViewBooking={showBookingDetails} />
                        ) : selectedSection === 'Reviews' ? (
                            <HostReviewsN />
                        ) : selectedSection === 'Earnings Summary' ? (
                            <HostEarningSummary />
                        ) : selectedSection === 'Add Property' ? (
                            <HostAddProperty
                                onBack={() => setSelectedSection('Properties')}
                            />
                        ) : selectedSection === 'Settings' ? (
                            <HostSettingsN />
                        ) : selectedSection === 'Help' ? (
                            <HostHelp />
                        ) : null}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}