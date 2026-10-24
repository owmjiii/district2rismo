import { useEffect, useState } from 'react'

const photoGroups = [
    { id: 'cover', title: 'Cover Photo', multiple: false },
    { id: 'gallery', title: 'Property Gallery', multiple: true },
    { id: 'kitchen', title: 'Kitchen & Dining', multiple: true },
    { id: 'facilities', title: 'Facilities & Amenities', multiple: true },
    { id: 'bathrooms', title: 'Bathrooms', multiple: true },
]

const formatFileSize = (bytes) => `${(bytes / 1024).toFixed(2)}kb`

export const PhotosMedia = ({ onBack, onNext, onExit, onPropertyChange, editNavigation }) => {
    const [photos, setPhotos] = useState({})

    useEffect(() => {
        return () => {
            Object.values(photos).flat().forEach((photo) => {
                URL.revokeObjectURL(photo.preview)
            })
        }
    }, [photos])

    const addPhotos = (group, fileList) => {
        const selectedFiles = Array.from(fileList).map((file) => ({
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            file,
            preview: URL.createObjectURL(file),
        }))

        if (selectedFiles.length && (group.id === 'cover' || group.id === 'gallery')) {
            const reader = new FileReader()
            reader.onload = () => {
                if (typeof reader.result !== 'string') {
                    console.error('Could not create a preview for the selected property photo.')
                    return
                }

                if (group.id === 'cover') {
                    onPropertyChange?.({ image: reader.result })
                    return
                }

                Promise.all(selectedFiles.map(({ file }) => new Promise((resolve, reject) => {
                    const galleryReader = new FileReader()
                    galleryReader.onload = () => typeof galleryReader.result === 'string'
                        ? resolve(galleryReader.result)
                        : reject(new Error('Could not create a preview for a gallery photo.'))
                    galleryReader.onerror = () => reject(galleryReader.error || new Error('Could not read a gallery photo.'))
                    galleryReader.readAsDataURL(file)
                })))
                    .then((galleryImages) => onPropertyChange?.({ galleryImages }))
                    .catch((error) => console.error('Could not load property gallery photos:', error))
            }
            reader.onerror = () => console.error('Could not read the selected property photo:', reader.error)
            reader.readAsDataURL(selectedFiles[0].file)
        }

        setPhotos((current) => ({
            ...current,
            [group.id]: group.multiple
                ? [...(current[group.id] || []), ...selectedFiles]
                : selectedFiles.slice(0, 1),
        }))
    }

    const removePhoto = (groupId, photoId) => {
        setPhotos((current) => {
            const photo = (current[groupId] || []).find((item) => item.id === photoId)
            if (photo) URL.revokeObjectURL(photo.preview)

            return {
                ...current,
                [groupId]: (current[groupId] || []).filter((item) => item.id !== photoId),
            }
        })
    }

    const renderGroup = (group) => {
        const inputId = `photo-upload-${group.id}`
        const groupPhotos = photos[group.id] || []

        return (
            <section className="mb-3" key={group.id}>
                <label
                    htmlFor={inputId}
                    className="form-control host-photo-uploadN d-flex align-items-center justify-content-between"
                >
                    <span>{group.title}</span>
                    <i className="bi bi-upload" aria-hidden="true" />
                </label>

                <input
                    id={inputId}
                    className="visually-hidden"
                    type="file"
                    accept="image/*"
                    multiple={group.multiple}
                    onChange={(event) => {
                        addPhotos(group, event.target.files)
                        event.target.value = ''
                    }}
                />

                {groupPhotos.length > 0 && (
                    <div className="d-flex flex-column gap-1 mt-1">
                        {groupPhotos.map((photo) => (
                            <div
                                className="host-photo-fileN d-flex align-items-center gap-2 rounded-2 px-3 py-2"
                                key={photo.id}
                            >
                                <img
                                    className="host-photo-thumbnailN rounded-1"
                                    src={photo.preview}
                                    alt=""
                                />
                                <span className="small text-truncate flex-grow-1">
                                    <span className="text-warning">{photo.file.name}</span>
                                    {' '}({formatFileSize(photo.file.size)})
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-sm host-photo-removeN p-0"
                                    aria-label={`Remove ${photo.file.name}`}
                                    onClick={() => removePhoto(group.id, photo.id)}
                                >
                                    <i className="bi bi-x-lg" aria-hidden="true" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        )
    }

    return (
        <section className="host-add-propertyN container-fluid p-3 p-md-4 p-lg-5">
            {editNavigation}
            <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <button
                            type="button"
                            className="btn btn-link p-0 host-add-property-crumbN"
                            onClick={onExit}
                        >
                            Properties
                        </button>
                    </li>
                    <li className="breadcrumb-item active text-warning" aria-current="page">
                        Add Property
                    </li>
                </ol>
            </nav>

            <h1 className="h5 fw-bold text-warning mb-4">3. Photos and Media</h1>

            <div className="row g-4">
                <div className="col-12 col-md-6">
                    {photoGroups.slice(0, 3).map(renderGroup)}
                </div>
                <div className="col-12 col-md-6">
                    {photoGroups.slice(3).map(renderGroup)}
                </div>
            </div>

            <hr className="host-add-property-dividerN mt-4 mb-3" />

            <div className="d-flex justify-content-end gap-2">
                <button
                    type="button"
                    className="btn host-add-property-backN rounded-pill px-5 py-2"
                    onClick={onBack}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="btn btn-warning rounded-pill px-5 py-2 host-add-property-nextN"
                    onClick={onNext}
                >
                    Next
                </button>
            </div>
        </section>
    )
}