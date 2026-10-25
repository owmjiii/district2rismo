import { useState } from 'react'
import { AdminNavbar } from './AdminNavbar.jsx'
import { AdminHostRevoke } from './AdminHostRevoke.jsx'
import { AdminHostDeactivate } from './AdminHostDeactivate.jsx'

const sampleProperties = [
    { name: 'Fabian’s Azzure', location: 'Bustos', status: 'Approved' },
    { name: 'Villa Sirena', location: 'Bustos', status: 'Pending' },
]

export function AdminHostDetails({
    host,
    onBack,
    preview = false,
    onRevokeVerification,
    onDeactivateHost,
}) {
    const [showRevoke, setShowRevoke] = useState(false)
    const [showDeactivate, setShowDeactivate] = useState(false)

    return (
        <div className="admin-shellN">
            <AdminNavbar activeSection="Hosts" preview={preview} />
            <main className="container-fluid px-0">
                <div className="admin-content-scrollN flex-grow-1">
                    <section className="admin-host-detailN container-fluid p-3 p-md-4">
                        <nav aria-label="Breadcrumb" className="mb-3">
                            <ol className="breadcrumb small mb-0">
                                <li className="breadcrumb-item">
                                    <button type="button" className="admin-host-backN" onClick={onBack}>Hosts</button>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Host Details</li>
                            </ol>
                        </nav>

                        <header className="card border-0 rounded-3 p-3 p-md-4 mb-3 admin-host-detail-headerN">
                            <div className="row align-items-center g-3">
                                <div className="col">
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="admin-host-detail-avatarN rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" aria-hidden="true">
                                            {(host.name || 'H').charAt(0).toUpperCase()}
                                        </span>
                                        <div>
                                            <h1 className="mb-1">{host.name}</h1>
                                            <p className="text-warning mb-0">{host.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-auto">
                                    <span className="badge rounded-pill admin-host-detail-statusN">{host.status}</span>
                                </div>
                            </div>
                        </header>

                        <section className="admin-host-detail-panelN rounded-3 p-3 p-md-4 mb-3">
                            <h2 className="h5 fw-bold mb-3">Host Information</h2>
                            <dl className="row mb-0">
                                <dt className="col-sm-6 fw-normal py-2">Name</dt>
                                <dd className="col-sm-6 text-sm-end py-2">{host.name}</dd>
                                <dt className="col-sm-6 fw-normal py-2">Email</dt>
                                <dd className="col-sm-6 text-sm-end py-2">{host.email}</dd>
                                <dt className="col-sm-6 fw-normal py-2">Phone</dt>
                                <dd className="col-sm-6 text-sm-end py-2">{host.phone || '—'}</dd>
                                <dt className="col-sm-6 fw-normal py-2">Verification Status</dt>
                                <dd className="col-sm-6 text-sm-end text-warning py-2">{host.status}</dd>
                            </dl>
                        </section>

                        <section className="admin-host-detail-panelN admin-host-propertiesN rounded-3 p-3 p-md-4 mb-3">
                            <h2 className="h5 fw-bold mb-3">Properties</h2>
                            <div className="table-responsive">
                                <table className="table table-borderless align-middle admin-host-properties-tableN mb-0">
                                    <thead><tr><th scope="col">Property</th><th scope="col">Location</th><th scope="col">Status</th></tr></thead>
                                    <tbody>
                                        {sampleProperties.map((property) => (
                                            <tr key={property.name}>
                                                <td>{property.name}</td>
                                                <td>{property.location}</td>
                                                <td>{property.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className="d-flex flex-wrap justify-content-end gap-3">
                            <button type="button" className="btn admin-host-deactivateN admin-user-account-buttonN" onClick={() => setShowDeactivate(true)}>
                                Deactivate Account
                            </button>
                            {host.status === 'Verified' && (
                                <button type="button" className="btn admin-host-revokeN admin-user-account-buttonN" onClick={() => setShowRevoke(true)}>
                                    Revoke Verification
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <AdminHostRevoke
                show={showRevoke}
                host={host}
                onHide={() => setShowRevoke(false)}
                onConfirm={onRevokeVerification}
            />
            <AdminHostDeactivate
                show={showDeactivate}
                host={host}
                onHide={() => setShowDeactivate(false)}
                onConfirm={onDeactivateHost}
            />
        </div>
    )
}
