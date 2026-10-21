import { useState } from 'react'

const initialProfile = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
}

export const EditProfileN = ({ onSave }) => {
    const [profile, setProfile] = useState(initialProfile)
    const [draft, setDraft] = useState(initialProfile)
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setDraft((current) => ({ ...current, [name]: value }))
    }

    const handleEdit = () => {
        setDraft(profile)
        setIsEditing(true)
    }

    const handleCancel = () => {
        setDraft(profile)
        setIsEditing(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setProfile(draft)
        setIsEditing(false)
        onSave?.(draft)
    }

    return (
        <section className="profile-panelN container-fluid p-3 p-md-4 p-lg-5 text-white">
            <h1 className="h2 fw-bold profile-titleN mb-4">My Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="row g-3 g-lg-4">
                    <div className="col-12 col-md-6">
                        <label className="form-label profile-labelN" htmlFor="profile-first-name">First Name</label>
                        <input id="profile-first-name" className="form-control profile-inputN" name="firstName" value={draft.firstName} onChange={handleChange} readOnly={!isEditing} autoComplete="given-name" />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label profile-labelN" htmlFor="profile-date-of-birth">Date of Birth</label>
                        <input id="profile-date-of-birth" className="form-control profile-inputN" type="date" name="dateOfBirth" value={draft.dateOfBirth} onChange={handleChange} readOnly={!isEditing} autoComplete="bday" />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label profile-labelN" htmlFor="profile-last-name">Last Name</label>
                        <input id="profile-last-name" className="form-control profile-inputN" name="lastName" value={draft.lastName} onChange={handleChange} readOnly={!isEditing} autoComplete="family-name" />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label profile-labelN" htmlFor="profile-phone-number">Phone Number</label>
                        <input id="profile-phone-number" className="form-control profile-inputN" type="tel" name="phoneNumber" value={draft.phoneNumber} onChange={handleChange} readOnly={!isEditing} autoComplete="tel" />
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                    {isEditing ? (
                        <>
                            <button className="btn btn-outline-light rounded-pill px-4" type="button" onClick={handleCancel}>Cancel</button>
                            <button className="btn btn-warning rounded-pill px-4 fw-semibold" type="submit">Save</button>
                        </>
                    ) : (
                        <button className="btn btn-warning rounded-pill px-5 fw-semibold" type="button" onClick={handleEdit}>Edit</button>
                    )}
                </div>
            </form>
        </section>
    )
}