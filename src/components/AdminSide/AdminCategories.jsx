import { useRef, useState } from 'react'

const initialPropertyCategories = [
    { type: 'Private Resort', total: 26, status: 'Active' },
]

const initialAmenityGroups = [
    {
        name: 'General Amenities',
        amenities: [
            'Private Swimming Pool',
            'Diving Pool',
            'Adult Pool',
            'Kiddie Pool',
            'Water Slides',
            'Jacuzzi / Hot Tub',
            'Outdoor Shower',
        ],
    },
    { name: 'Accommodation & Comfort', amenities: [] },
    { name: 'Cooking & Entertainment', amenities: [] },
    { name: 'Group & Event Facilities', amenities: [] },
    { name: 'Outdoor Amenities', amenities: [] },
    { name: 'Convenience and Safety', amenities: [] },
]

export function AdminCategories() {
    const [propertyCategories, setPropertyCategories] = useState(
        initialPropertyCategories
    )
    const [amenityGroups, setAmenityGroups] = useState(initialAmenityGroups)
    const [activeGroup, setActiveGroup] = useState(initialAmenityGroups[0].name)
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [amenityName, setAmenityName] = useState('')
    const amenityInputRef = useRef(null)

    const selectedGroup = amenityGroups.find((group) => group.name === activeGroup)

    const addPropertyCategory = (event) => {
        event.preventDefault()
        const name = categoryName.trim()

        if (!name) return

        setPropertyCategories((current) => [
            ...current,
            { type: name, total: 0, status: 'Active' },
        ])
        setCategoryName('')
        setShowCategoryForm(false)
    }

    const addAmenity = (event) => {
        event.preventDefault()
        const name = amenityName.trim()

        if (!name || !selectedGroup) return

        setAmenityGroups((current) =>
            current.map((group) =>
                group.name === activeGroup
                    ? { ...group, amenities: [...group.amenities, name] }
                    : group
            )
        )
        setAmenityName('')
    }

    return (
        <section className="admin-categoriesN container-fluid p-3 p-md-4">
            <h1 className="h2 fw-bold mb-4">Categories and Settings</h1>

            <section aria-labelledby="property-categories-title" className="mb-5">
                <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                    <h2 id="property-categories-title" className="h5 mb-0">
                        Property Categories
                    </h2>

                    <button
                        type="button"
                        className="btn admin-category-primaryN"
                        onClick={() => setShowCategoryForm((show) => !show)}
                    >
                        Add Category
                    </button>
                </div>

                {showCategoryForm && (
                    <form
                        className="row g-2 mb-3"
                        onSubmit={addPropertyCategory}
                    >
                        <div className="col">
                            <label className="visually-hidden" htmlFor="new-property-category">
                                Category name
                            </label>
                            <input
                                id="new-property-category"
                                className="form-control admin-category-inputN"
                                value={categoryName}
                                onChange={(event) => setCategoryName(event.target.value)}
                                placeholder="Enter category name"
                                required
                            />
                        </div>
                        <div className="col-auto">
                            <button className="btn admin-category-primaryN" type="submit">
                                Add
                            </button>
                        </div>
                    </form>
                )}

                <div className="table-responsive">
                    <table className="table table-borderless align-middle admin-category-tableN mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Property Type</th>
                                <th scope="col">Total Properties Listed</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propertyCategories.map((category) => (
                                <tr key={category.type}>
                                    <td>{category.type}</td>
                                    <td>{category.total}</td>
                                    <td>{category.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="admin-amenitiesN p-3 p-md-4" aria-labelledby="amenities-title">
                <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                    <h2 id="amenities-title" className="h5 fw-semibold mb-0">
                        Amenities Listed
                    </h2>

                    <button
                        type="button"
                        className="btn admin-category-primaryN"
                        onClick={() => amenityInputRef.current?.focus()}
                    >
                        Add Amenities
                    </button>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-md-4 col-xl-4">
                        <div
                            className="d-flex flex-column gap-2"
                            role="group"
                            aria-label="Amenity categories"
                        >
                            {amenityGroups.map((group) => (
                                <button
                                    key={group.name}
                                    type="button"
                                    className={`btn admin-amenity-tabN ${
                                        activeGroup === group.name ? 'active' : ''
                                    }`}
                                    aria-pressed={activeGroup === group.name}
                                    onClick={() => setActiveGroup(group.name)}
                                >
                                    {group.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 col-md-8 col-xl-8">
                        <div className="admin-amenity-listN rounded-3 p-3 p-md-4">
                            <div className="row row-cols-1 row-cols-lg-2 g-3">
                                {selectedGroup?.amenities.map((amenity) => (
                                    <div className="col" key={amenity}>
                                        {amenity}
                                    </div>
                                ))}

                                <div className="col">
                                    <form onSubmit={addAmenity}>
                                        <label
                                            className="visually-hidden"
                                            htmlFor="new-amenity"
                                        >
                                            Add an amenity
                                        </label>
                                        <input
                                            ref={amenityInputRef}
                                            id="new-amenity"
                                            className="form-control admin-category-inputN"
                                            value={amenityName}
                                            onChange={(event) =>
                                                setAmenityName(event.target.value)
                                            }
                                            placeholder="Add another on the list..."
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}