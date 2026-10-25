import { AdminNavbar } from '../components/AdminSide/AdminNavbar.jsx'
import { AdminUserDetail } from '../components/AdminSide/AdminUserDetails.jsx'

export function AdminUserViewDetail({
    user,
    onBack,
    activeSection = 'Users',
    onSelect,
}) {
    return (
        <div className="admin-shellN">
            <AdminNavbar
                activeSection={activeSection}
                onSelect={onSelect}
            />

            <main className="container-fluid px-0">
                <div className="admin-content-scrollN flex-grow-1">
                    <AdminUserDetail
                        user={user}
                        onBack={onBack}
                    />
                </div>
            </main>
        </div>
    )
}