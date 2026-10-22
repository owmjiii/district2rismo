import { useState } from 'react'
import NavBarDetails from '../components/NavBarDetails.jsx'
import Footer from '../components/Footer.jsx'
import { SideBarN } from '../components/Account/SideBarN.jsx'
import { EditProfileN } from '../components/Account/EditProfileN.jsx'
import { NotificationsN, temporaryNotifications } from '../components/Account/NotificationsN.jsx'
import { MyReservationN } from '../components/Account/MyReservationN.jsx'
import { DestinationToReviewN } from '../components/Account/DestinationToReviewN.jsx'
import { SettingsN } from '../components/Account/SettingsN.jsx'
import { HelpN } from '../components/Account/HelpN.jsx'

function Account() {
    const [selectedSection, setSelectedSection] = useState('Profile')
    const unreadNotificationCount = temporaryNotifications.length
    return (
        <div className="account-pageN">
            <NavBarDetails />
            <main className="account-mainN container-fluid px-0">
                <div className="row g-0">
                    <div className="col-12 col-lg-3">
                        <SideBarN onSelect={setSelectedSection} notificationCount={unreadNotificationCount} />
                    </div>
                    <div className={`col-12 col-lg-9 ${selectedSection === 'Profile' ? 'd-none d-lg-block' : ''}`}>
                        {selectedSection === 'Notifications'
                            ? <NotificationsN notifications={temporaryNotifications} />
                            : selectedSection === 'My Reservation'
                                ? <MyReservationN />
                                : selectedSection === 'Destinations to Review'
                                    ? <DestinationToReviewN />
                                    : selectedSection === 'Profile'
                                        ? <EditProfileN />
                                        : selectedSection === 'Settings'
                                            ? <SettingsN />
                                            : selectedSection === 'Help'
                                                ? <HelpN />
                                                : null}

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Account