import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

const reasons = [
    'Violation of verification requirements',
    'Misleading or inaccurate information',
    'Reported policy violation',
    'Other',
]

export function AdminHostRevoke({ show, host, onHide, onConfirm }) {
    const [reason, setReason] = useState('')
    const [notifyHost, setNotifyHost] = useState(false)

    const closeModal = () => {
        setReason('')
        setNotifyHost(false)
        onHide()
    }

    const submitRevocation = (event) => {
        event.preventDefault()
        onConfirm?.({ host, reason, notifyHost })
        closeModal()
    }

    return (
        <Modal
            show={show}
            onHide={closeModal}
            centered
            dialogClassName="admin-host-revoke-dialogN"
            contentClassName="admin-host-revoke-modalN"
            aria-labelledby="admin-host-revoke-title"
        >
            <button
                type="button"
                className="admin-suspend-closeN"
                aria-label="Close"
                onClick={closeModal}
            >
                <i className="bi bi-x-lg" aria-hidden="true" />
            </button>

            <form onSubmit={submitRevocation}>
                <Modal.Body className="admin-host-revoke-bodyN">
                    <h2
                        id="admin-host-revoke-title"
                        className="admin-suspend-titleN text-center fw-bold"
                    >
                        Revoke Verification
                    </h2>

                    <p className="text-center mb-4">
                        Are you sure you want to revoke {host.name}&apos;s
                        verification? The host will lose their Verified status
                        until the issue is resolved and verification is restored.
                        Their property listings may be restricted according to
                        District2rismo&apos;s policies.
                    </p>

                    <label className="form-label" htmlFor="host-revoke-reason">
                        Reason for Revocation:
                    </label>
                    <select
                        id="host-revoke-reason"
                        className="form-select admin-host-revoke-selectN mb-4"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                    >
                        <option value="" disabled>Select Reason</option>
                        {reasons.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <div className="form-check admin-host-revoke-notifyN mb-4">
                        <input
                            id="host-revoke-notify"
                            className="form-check-input"
                            type="checkbox"
                            checked={notifyHost}
                            onChange={(event) => setNotifyHost(event.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="host-revoke-notify">
                            Notify the host about this decision
                        </label>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn admin-suspend-cancelN"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn admin-suspend-confirmN">
                            Revoke Verification
                        </button>
                    </div>
                </Modal.Body>
            </form>
        </Modal>
    )
}