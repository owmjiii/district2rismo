import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export function AdminUserDeactivate({ show, user, onHide, onConfirm }) {
    const [reason, setReason] = useState('')

    const handleConfirm = (event) => {
        event.preventDefault()
        onConfirm?.(reason)
        setReason('')
        onHide()
    }

    const handleClose = () => {
        setReason('')
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="admin-deactivate-dialogN"
            contentClassName="admin-deactivate-modalN"
            aria-labelledby="admin-deactivate-title"
        >
            <button
                type="button"
                className="admin-deactivate-closeN"
                aria-label="Close"
                onClick={handleClose}
            >
                <i className="bi bi-x-lg" aria-hidden="true" />
            </button>

            <form onSubmit={handleConfirm}>
                <Modal.Body className="admin-deactivate-bodyN">
                    <h2 id="admin-deactivate-title" className="admin-deactivate-titleN text-center fw-bold">
                        Deactivate Account
                    </h2>

                    <p className="admin-deactivate-messageN text-center">
                        Are you sure you want to deactivate <strong>{user.name}'s</strong> account?
                        The user will no longer be able to log in or make new reservations.
                    </p>

                    <label htmlFor="admin-deactivate-reason" className="form-label">
                        Reason:
                    </label>
                    <input
                        id="admin-deactivate-reason"
                        type="text"
                        className="form-control admin-deactivate-inputN"
                        placeholder="Type Reason"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                    />

                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                        <button
                            type="button"
                            className="btn admin-deactivate-cancelN"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn admin-deactivate-confirmN">
                            Deactivate Account
                        </button>
                    </div>
                </Modal.Body>
            </form>
        </Modal>
    )
}