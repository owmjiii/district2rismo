import Footer from '../components/Footer.jsx'
import { HostNavBar } from '../components/HostSide/HostNavBar.jsx'
import { HostMyProfile } from '../components/HostSide/HostMyProfile.jsx'

export function HostMyProfilePage({ preview = false }) {
    return (
        <div className="account-pageN">
            <HostNavBar activeSection="My Profile" preview={preview} />
            <main className="account-mainN container-fluid px-0">
                <HostMyProfile />
            </main>
            <Footer />
        </div>
    )
}