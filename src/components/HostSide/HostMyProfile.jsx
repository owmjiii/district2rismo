import { useState } from 'react'

const initialProfile = {
    firstName: 'Mj',
    dateOfBirth: '2006-03-24',
    lastName: 'Massalang',
    phoneNumber: '0994 951 7001',
}

export function HostMyProfile() {
    const [profile, setProfile] = useState(initialProfile)
    const [draft, setDraft] = useState(initialProfile)
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setDraft((current) => ({ ...current, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setProfile(draft)
        setIsEditing(false)
    }

    const fields = [
        { label: 'First Name', name: 'firstName', type: 'text', autoComplete: 'given-name' },
        { label: 'Date of Birth', name: 'dateOfBirth', type: 'date', autoComplete: 'bday' },
        { label: 'Last Name', name: 'lastName', type: 'text', autoComplete: 'family-name' },
        { label: 'Phone Number', name: 'phoneNumber', type: 'tel', autoComplete: 'tel' },
    ]

    return (
        <section className="profile-panelN container-fluid p-3 p-md-4 p-lg-5 text-white">
            <h1 className="h2 fw-bold profile-titleN mb-4">My Profile</h1>

            <form onSubmit={handleSubmit}>
                <div className="row g-3 g-lg-4">
                    {fields.map((field) => (
                        <div className="col-12 col-md-6" key={field.name}>
                            <label
                                className="form-label profile-labelN mb-1"
                                htmlFor={`host-profile-${field.name}`}
                            >
                                {field.label}
                            </label>
                            <input
                                id={`host-profile-${field.name}`}
                                className="form-control profile-inputN"
                                type={field.type}
                                name={field.name}
                                value={draft[field.name]}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                autoComplete={field.autoComplete}
                            />
                        </div>
                    ))}

                    <div className="col-12 col-md-6 offset-md-6 d-flex justify-content-end">
                        {isEditing ? (
                            <button
                                className="btn btn-warning rounded-pill px-5 fw-semibold"
                                type="submit"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className="btn btn-warning rounded-pill px-5 fw-semibold"
                                type="button"
                                onClick={() => {
                                    setDraft(profile)
                                    setIsEditing(true)
                                }}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </section>
    )
}