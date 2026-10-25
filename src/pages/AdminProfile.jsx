import { AdminNavbar } from '../components/AdminSide/AdminNavbar.jsx'
import { AdminMyprofile } from '../components/AdminSide/AdminMyprofile.jsx'

export function AdminProfilePage({ preview = false }) {
    return (
        <div className="account-pageN">
            <AdminNavbar activeSection="My Profile" preview={preview} />
            <main className="account-mainN container-fluid px-0">
                <AdminMyprofile />
            </main>
        </div>
    )
}