const steps = [
    'Basic Property Information',
    'Amenities & Facilities',
    'Photos and Media',
    'Check-in & Check-out Times and Rates',
    'Bedrooms',
    'Property Rules',
    'Verification & Submission',
]

export function HostViewPropertyNav({ activeStep,
    onStepChange,
    onBack,
    currentLabel = 'Edit Property',
    showBreadcrumb = true,
    compact = false,
}) {
    return (
        <header className={`px-3 px-md-4 ${compact ? 'pt-2' : 'pt-5'} pb-3`}>
            {showBreadcrumb && <nav aria-label="Breadcrumb">
                <ol className="breadcrumb small mb-2">
                    <li className="breadcrumb-item">
                        <button
                            type="button"
                            className="btn btn-link p-0 text-light text-decoration-none"
                            onClick={onBack}
                        >
                            Properties
                        </button>
                    </li>
                    <li className="breadcrumb-item active text-warning" aria-current="page">
                        {currentLabel}
                    </li>
                </ol>
            </nav>}

            <nav aria-label="Property editing steps">
                <div className="nav nav-pills flex-nowrap gap-2 overflow-x-auto pb-2 mt-1">
                    {steps.map((label, index) => {
                        const step = index + 1
                        const isActive = activeStep === step

                        return (
                            <button
                                key={label}
                                type="button"
                                className={`btn btn-sm rounded-pill flex-shrink-0 text-nowrap px-3 ${isActive ? 'btn-warning' : 'btn-outline-warning'
                                    }`}
                                aria-current={isActive ? 'step' : undefined}
                                onClick={() => onStepChange?.(step)}
                            >
                                {label}
                            </button>
                        )
                    })}
                </div>
            </nav>
        </header>
    )
}






