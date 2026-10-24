import resortImage from '../../images/Bustos Hero.png'
import { useNavigate } from 'react-router-dom'

const properties = [
    {
        id: 'galilee-wonderland',
        name: 'Galilee Wonderland Resort',
        location: 'Bustos, Bulacan',
        image: resortImage,
    },
]

export const HostPropertiesN = ({ onAddProperty, onViewProperty, onDeleteProperty }) => {
    const navigate = useNavigate()
    return (

        <section className="host-propertiesN container-fluid p-3 p-md-4">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                <h1 className="h2 fw-bold mb-0">Properties</h1>

                <div className="d-flex align-items-center gap-2">
                    <button type="button" className="btn btn-warning btn-sm rounded-pill px-3" onClick={onAddProperty}>
                        Add Property
                    </button>
                    <button type="button" className="btn host-delete-propertyN p-1" aria-label="Delete property" onClick={() => onDeleteProperty?.(properties[0])}>
                        <i className="bi bi-trash-fill" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <div className="d-flex flex-column gap-2">
                {properties.map((property) => (
                    <article key={property.id} className="host-property-rowN d-flex align-items-center gap-2 rounded-3 p-2">
                        <img className="host-property-imageN rounded-2" src={property.image} alt={property.name} />

                        <div className="flex-grow-1 min-w-0">
                            <h2 className="h6 mb-0">{property.name}</h2>
                            <p className="small text-warning mb-0">{property.location}</p>
                        </div>

                        <button type="button" className="btn btn-link host-view-propertyN text-nowrap" onClick={() => navigate('/host/view-property', { state: { property } })}>
                            View Details
                        </button>
                    </article>
                ))}
            </div>
        </section>
    )
}