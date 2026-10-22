import { useState } from 'react'
import NavBarDetails from '../components/NavBarDetails.jsx'
import Footer from '../components/Footer.jsx'
import { HostSideBarN } from '../components/HostSide/HostSideBarN.jsx'
import { HostDashboardN } from '../components/HostSide/HostDashboardN.jsx'
import { HostNotificationN } from '../components/HostSide/HostNotificationN.jsx'

function HostN() {
    const [selectedSection, setSelectedSection] = useState('Dashboard')

    return (
        <div className="account-pageN">
            <NavBarDetails />

            <main className="account-mainN container-fluid px-0">
                <div className="row g-0">
                    <div className="col-12 col-lg-3">
                        <HostSideBarN onSelect={setSelectedSection} />
                    </div>

                    <div className="col-12 col-lg-9">
                        {selectedSection === 'Dashboard'
                            ? <HostDashboardN />
                            : selectedSection === 'Notifications'
                                ? <HostNotificationN />
                                : <p className="p-4 text-white">{selectedSection} page coming soon.</p>}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default HostN