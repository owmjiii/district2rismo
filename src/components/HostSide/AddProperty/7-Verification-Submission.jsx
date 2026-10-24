import { useState } from 'react'

const uploadGroups = [
    [
        { id: 'permit', label: 'Mayor/Business Permit', required: true },
        { id: 'registration', label: 'Business Registration Certificate (DTI, SEC, CDA)', required: true },
        { id: 'ownership', label: 'Proof of Ownership / Authorization', required: true },
    ],
    [
        { id: 'government-id', label: 'Government-issued ID (Back-to-Back)', required: true },
        { id: 'fire-safety-1', label: 'Fire Safety Inspection Certificate', dropzone: true },
        { id: 'fire-safety-2', label: 'Fire Safety Inspection Certificate', dropzone: true },
    ],
]

const formatFileSize = (bytes) => `${(bytes / 1024).toFixed(2)}kb`

export const VerificationSubmission = ({ onBack, onSubmit, property, onPropertyChange, isEditing = false, editNavigation }) => {
    const [files, setFiles] = useState(property?.verificationFiles || {})
    const [errors, setErrors] = useState({})

    const addFile = (id, file) => {
        if (!file) return
        const updated = { ...files, [id]: file }
        setFiles(updated)
        onPropertyChange?.({ verificationFiles: updated })
        setErrors((current) => ({ ...current, [id]: false }))
    }

    const removeFile = (id) => {
        const updated = { ...files }
        delete updated[id]
        setFiles(updated)
        onPropertyChange?.({ verificationFiles: updated })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const missingFiles = uploadGroups
            .flat()
            .filter((group) => group.required && !files[group.id])
            .map((group) => group.id)

        if (!isEditing && missingFiles.length) {
            setErrors(Object.fromEntries(missingFiles.map((id) => [id, true])))
            return
        }

        onSubmit?.(files)
    }

    const renderUpload = (group) => (
        <div className="mb-3" key={group.id}>
            <label className="form-label small mb-1" htmlFor={`upload-${group.id}`}>
                {group.label}
            </label>

            <label
                className="form-control host-verification-uploadN d-flex align-items-center justify-content-between"
                htmlFor={`upload-${group.id}`}
            >
                <span>Upload png, jpg, or pdf</span>
                <i className="bi bi-upload" aria-hidden="true" />
            </label>

            <input
                id={`upload-${group.id}`}
                className="visually-hidden"
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf"
                onChange={(event) => {
                    addFile(group.id, event.target.files?.[0])
                    event.target.value = ''
                }}
            />

            {group.required && <span className="text-warning ms-2" aria-hidden="true">*</span>}

            {errors[group.id] && (
                <div className="small text-warning mt-1">This document is required.</div>
            )}

            {files[group.id] ? (
                <div className="host-photo-fileN d-flex align-items-center gap-2 rounded-2 px-3 py-2 mt-2">
                    <i className="bi bi-file-earmark-image text-warning" aria-hidden="true" />
                    <span className="small text-truncate flex-grow-1">
                        <span className="text-warning">{files[group.id].name}</span>
                        {' '}({formatFileSize(files[group.id].size)})
                    </span>
                    <button
                        type="button"
                        className="btn btn-sm host-photo-removeN p-0"
                        aria-label={`Remove ${files[group.id].name}`}
                        onClick={() => removeFile(group.id)}
                    >
                        &times;
                    </button>
                </div>
            ) : group.dropzone ? (
                <label
                    className="host-verification-dropN d-flex align-items-center justify-content-center rounded-2 mt-2"
                    htmlFor={`upload-${group.id}`}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                        event.preventDefault()
                        addFile(group.id, event.dataTransfer.files?.[0])
                    }}
                >
                    or drag and drop file here
                </label>
            ) : null}
        </div>
    )

    return (
        <section className="host-add-propertyN container-fluid p-3 p-md-4 p-lg-5">
            {editNavigation}
            <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <span>Properties</span>
                    </li>
                    <li className="breadcrumb-item active text-warning" aria-current="page">
                        Add Property
                    </li>
                </ol>
            </nav>

            <h1 className="h5 fw-bold text-warning mb-4">
                7. Verification &amp; Submission
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    {uploadGroups.map((column, index) => (
                        <div className="col-12 col-md-6" key={index}>
                            {column.map(renderUpload)}
                        </div>
                    ))}
                </div>

                <hr className="host-add-property-dividerN mt-5 mb-3" />

                <div className="d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        className="btn host-add-property-backN rounded-pill px-5 py-2"
                        onClick={onBack}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="btn btn-warning rounded-pill px-5 py-2 host-add-property-nextN"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    )
}