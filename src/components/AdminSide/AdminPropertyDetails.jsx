import resortImage from '../../images/Bustos Hero.png'
import { HostAddProperty } from '../../pages/HostAddProperty.jsx'

export function AdminPropertyDetails({
    property,
    onBack,
    onReject,
    onApprove,
}) {
    return (
        <section className="admin-property-detailsN container-fluid p-3 p-md-4">
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb small mb-0">
                    <li className="breadcrumb-item">
                        <button
                            type="button"
                            className="admin-property-backN"
                            onClick={onBack}
                        >
                            Properties
                        </button>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Property Details
                    </li>
                </ol>
            </nav>

            <header className="card admin-property-detail-headerN border-0 p-3 p-md-4 mb-3">
                <div className="row align-items-center g-3">
                    <div className="col-auto">
                        <img
                            className="admin-property-detail-imageN rounded-2"
                            src={property.image || resortImage}
                            alt=""
                        />
                    </div>
                    <div className="col">
                        <h1 className="h2 mb-0">{property.name}</h1>
                        <p className="text-warning mb-0">
                            Listed By: {property.owner}
                        </p>
                    </div>
                    <div className="col-12 col-md-auto">
                        <span className="badge rounded-pill admin-property-detail-statusN">
                            {property.status}
                        </span>
                    </div>
                </div>
            </header>

            <HostAddProperty
                mode="review"
                property={property}
                onBack={onBack}
                onReject={() => onReject?.(property)}
                onApprove={() => onApprove?.(property)}
            />
        </section>
    )
}