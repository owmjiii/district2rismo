import { useState } from 'react'
import { BasicPropInfo } from '../components/HostSide/AddProperty/1-Basic-Property-Information.jsx'
import { AmenitiesFacilities } from '../components/HostSide/AddProperty/2-Amenities-Facilities.jsx'
import { PhotosMedia } from '../components/HostSide/AddProperty/3-Photos-Media.jsx'
import { CheckInCheckOutTimesRules } from '../components/HostSide/AddProperty/4-CheckIn-CheckOu-TImes&Rules.jsx'
import { Bedrooms } from '../components/HostSide/AddProperty/5-Bedrooms.jsx'
import { PropertyRulesPolicies } from '../components/HostSide/AddProperty/6-Property-Rules&Policies.jsx'
import { VerificationSubmission } from '../components/HostSide/AddProperty/7-Verification-Submission.jsx'
import { HostViewPropertyNav } from '../components/HostSide/ViewPropertyDetails/HostViewPropertyNav.jsx'

export function HostAddProperty({ onBack, onNext, onReject, onApprove, onRemoveUnhide, onRemoveHide, mode = 'add', property }) {
    const [step, setStep] = useState(1)
    const [draft, setDraft] = useState(property)

    const isReview = mode === 'review'
    const [reviewAction, setReviewAction] = useState(null)

    const handleReject = () => {
        if (reviewAction === 'rejected') {
            onRemoveUnhide?.(draft)
            return
        }
        if (reviewAction === 'approved') {
            onRemoveHide?.(draft)
            return
        }

        setReviewAction('rejected')
        onReject?.(draft)
    }

    const handleApprove = () => {
        if (reviewAction === 'approved') {
            onRemoveHide?.(draft)
            return
        }
        if (reviewAction === 'rejected') {
            onRemoveUnhide?.(draft)
            return
        }

        setReviewAction('approved')
        onApprove?.(draft)
    }

    const updateProperty = (changes) => {
        setDraft((current) => ({
            ...current,
            ...changes,
            ...(changes.mediaPhotos
                ? { mediaPhotos: { ...current?.mediaPhotos, ...changes.mediaPhotos } }
                : {}),
        }))
    }
    const editNavigation = mode === 'edit' || isReview ? (
        <HostViewPropertyNav
            activeStep={step}
            onStepChange={setStep}
            onBack={onBack}
            currentLabel={isReview ? 'Property Details' : 'Edit Property'}
            showBreadcrumb={!isReview}
            compact={isReview}
        />
    ) : null

    return (
        <main className={`host-add-property-pageN container-fluid px-0${mode === 'edit' ? ' host-edit-wizardN' : ''}`}>
            {isReview && editNavigation}

            <fieldset
                disabled={isReview}
                className={isReview ? 'admin-property-review-fieldsN' : ''}
            >
                {step === 1 ? (
                    <BasicPropInfo
                        onBack={onBack}
                        onNext={() => setStep(2)}
                        property={mode === 'edit' ? draft : undefined}
                        onPropertyChange={updateProperty}
                        editNavigation={mode === 'edit' ? editNavigation : null}
                    />
                ) : step === 2 ? (
                    <AmenitiesFacilities
                        onExit={onBack}
                        onBack={() => setStep(1)}
                        onNext={() => setStep(3)}
                        property={mode === 'edit' ? draft : undefined}
                        onPropertyChange={updateProperty}
                        editNavigation={mode === 'edit' ? editNavigation : null}
                    />
                ) : step === 3 ? (
                    <PhotosMedia
                        onExit={onBack}
                        onBack={() => setStep(2)}
                        onNext={() => setStep(4)}
                        property={draft}
                        onPropertyChange={updateProperty}
                        editNavigation={mode === 'edit' ? editNavigation : null}
                    />
                ) : step === 4 ? (
                    <CheckInCheckOutTimesRules
                        onExit={onBack}
                        onBack={() => setStep(3)}
                        onNext={() => setStep(5)}
                        property={mode === 'edit' ? draft : undefined}
                        onPropertyChange={updateProperty}
                        editNavigation={mode === 'edit' ? editNavigation : null}
                    />
                ) : step === 5 ? (
                    <Bedrooms
                        onExit={onBack}
                        onBack={() => setStep(4)}
                        onNext={() => setStep(6)}
                        property={draft}
                        onPropertyChange={updateProperty}
                        editNavigation={mode === 'edit' ? editNavigation : null}
                    />
                ) : step === 6 ? (
                    <PropertyRulesPolicies
                        onExit={onBack}
                        onBack={() => setStep(5)}
                        onNext={() => setStep(7)}
                        property={mode === 'edit' ? draft : undefined}
                        onPropertyChange={updateProperty}
                        editNavigation={mode === 'edit' ? editNavigation : null}
                    />
                ) : (
                    <VerificationSubmission
                        onBack={() => setStep(6)}
                        onSubmit={(verificationFiles) => onNext?.({ ...draft, verificationFiles })}
                        property={draft}
                        onPropertyChange={updateProperty}
                        isEditing={mode === 'edit'}
                        editNavigation={mode === 'edit' ? editNavigation : null}
                    />
                )}
            </fieldset>

            {isReview && (
                <div className="d-flex flex-wrap justify-content-end gap-3 mt-3  admin-property-review-actionsN">
                    <button
                        type="button"
                        className="btn rounded-pill admin-property-review-rejectN admin-user-account-buttonN"
                        onClick={handleReject}
                    >
                        {reviewAction ? 'Remove' : 'Reject'}
                    </button>

                    <button
                        type="button"
                        className="btn rounded-pill admin-property-review-approveN admin-user-account-buttonN"
                        onClick={handleApprove}
                    >
                        {reviewAction === 'rejected' ? 'Unhide' : reviewAction === 'approved' ? 'Hide' : 'Approved'}
                    </button>
                </div>
            )}
        </main>
    )
}

















