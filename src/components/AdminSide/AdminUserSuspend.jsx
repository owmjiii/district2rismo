import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

const suspensionReasons = [
    'Violation of Terms of Service',
    'Suspicious Account Activity',
    'Reported by Another User',
    'Other',
]

const suspensionDurations = ['7 Days', '30 Days', 'Indefinitely']

export function AdminUserSuspend({ show, user, onHide, onConfirm }) {
    const [selectedReason, setSelectedReason] = useState('')
    const [reason, setReason] = useState('')
    const [duration, setDuration] = useState('')

    const resetAndClose = () => {
        setSelectedReason('')
        setReason('')
        setDuration('')
        onHide()
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onConfirm?.({ selectedReason, reason, duration })
        resetAndClose()
    }

    return (
        <Modal
            show={show}
            onHide={resetAndClose}
            centered
            dialogClassName="admin-suspend-dialogN"
            contentClassName="admin-suspend-modalN"
            aria-labelledby="admin-suspend-title"
        >
            <button
                type="button"
                className="admin-suspend-closeN"
                aria-label="Close"
                onClick={resetAndClose}
            >
                <i className="bi bi-x-lg" aria-hidden="true" />
            </button>

            <form onSubmit={handleSubmit}>
                <Modal.Body className="admin-suspend-bodyN">
                    <h2 id="admin-suspend-title" className="admin-suspend-titleN text-center fw-bold">
                        Suspend Account
                    </h2>

                    <p className="text-center mb-2">Why are you suspending {user.name}'s account?</p>

                    <label className="visually-hidden" htmlFor="admin-suspend-reason-select">
                        Select a suspension reason
                    </label>
                    <select
                        id="admin-suspend-reason-select"
                        className="form-select admin-suspend-selectN text-center mb-4"
                        value={selectedReason}
                        onChange={(event) => setSelectedReason(event.target.value)}
                        required
                    >
                        <option value="" disabled>Select Reason</option>
                        {suspensionReasons.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>

                    <label htmlFor="admin-suspend-reason" className="form-label">
                        Reason:
                    </label>
                    <input
                        id="admin-suspend-reason"
                        type="text"
                        className="form-control admin-suspend-inputN mb-4"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                    />

                    <fieldset className="mb-5">
                        <legend className="form-label mb-2">Duration:</legend>
                        {suspensionDurations.map((option) => (
                            <div className="form-check admin-suspend-radioN" key={option}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="admin-suspend-duration"
                                    id={`admin-suspend-duration-${option.replace(/\s+/g, '-').toLowerCase()}`}
                                    value={option}
                                    checked={duration === option}
                                    onChange={(event) => setDuration(event.target.value)}
                                    required
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`admin-suspend-duration-${option.replace(/\s+/g, '-').toLowerCase()}`}
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                    </fieldset>

                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                        <button
                            type="button"
                            className="btn admin-suspend-cancelN"
                            onClick={resetAndClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn admin-suspend-confirmN">
                            Suspend Account
                        </button>
                    </div>
                </Modal.Body>
            </form>
        </Modal>
    )
}