import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export function AdminHostDeactivate({ show, host, onHide, onConfirm }) {
    const [reason, setReason] = useState('')

    const closeModal = () => {
        setReason('')
        onHide()
    }

    const submitDeactivation = (event) => {
        event.preventDefault()
        onConfirm?.({ host, reason })
        closeModal()
    }

    return (
        <Modal
            show={show}
            onHide={closeModal}
            centered
            dialogClassName="admin-host-deactivate-dialogN"
            contentClassName="admin-host-deactivate-modalN"
            aria-labelledby="admin-host-deactivate-title"
        >
            <button
                type="button"
                className="admin-host-deactivate-closeN"
                aria-label="Close"
                onClick={closeModal}
            >
                <i className="bi bi-x-lg" aria-hidden="true" />
            </button>

            <form onSubmit={submitDeactivation}>
                <Modal.Body className="admin-host-deactivate-bodyN">
                    <h2
                        id="admin-host-deactivate-title"
                        className="admin-host-deactivate-titleN text-center fw-bold"
                    >
                        Deactivate Account
                    </h2>

                    <p className="admin-host-deactivate-messageN text-center">
                        Are you sure you want to deactivate{' '}
                        <strong>{host.name}&rsquo;s</strong> account? The user will no
                        longer be able to log in or list a property.
                    </p>

                    <label
                        htmlFor="admin-host-deactivate-reason"
                        className="form-label"
                    >
                        Reason:
                    </label>
                    <input
                        id="admin-host-deactivate-reason"
                        type="text"
                        className="form-control admin-host-deactivate-inputN"
                        placeholder="Type Reason"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                    />

                    <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn admin-host-deactivate-cancelN"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn admin-host-deactivate-confirmN"
                        >
                            Deactivate Account
                        </button>
                    </div>
                </Modal.Body>
            </form>
        </Modal>
    )
}