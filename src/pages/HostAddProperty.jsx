import { useState } from 'react'
import { BasicPropInfo } from '../components/HostSide/AddProperty/1-Basic-Property-Information.jsx'
import { AmenitiesFacilities } from '../components/HostSide/AddProperty/2-Amenities-Facilities.jsx'
import { PhotosMedia } from '../components/HostSide/AddProperty/3-Photos-Media.jsx'
import { CheckInCheckOutTimesRules } from '../components/HostSide/AddProperty/4-CheckIn-CheckOu-TImes&Rules.jsx'
import { Bedrooms } from '../components/HostSide/AddProperty/5-Bedrooms.jsx'
import { PropertyRulesPolicies } from '../components/HostSide/AddProperty/6-Property-Rules&Policies.jsx'
import { VerificationSubmission } from '../components/HostSide/AddProperty/7-Verification-Submission.jsx'
import { HostViewPropertyNav } from '../components/HostSide/ViewPropertyDetails/HostViewPropertyNav.jsx'

export function HostAddProperty({ onBack, onNext, mode = 'add', property }) {
    const [step, setStep] = useState(1)
    const [draft, setDraft] = useState(property)
    const updateProperty = (changes) => {
        setDraft((current) => ({
            ...current,
            ...changes,
            ...(changes.mediaPhotos
                ? { mediaPhotos: { ...current?.mediaPhotos, ...changes.mediaPhotos } }
                : {}),
        }))
    }
    const editNavigation = mode === 'edit' ? (
        <HostViewPropertyNav
            activeStep={step}
            onStepChange={setStep}
            onBack={onBack}
        />
    ) : null

    return (
        <main className={`host-add-property-pageN container-fluid px-0${mode === 'edit' ? ' host-edit-wizardN' : ''}`}>
            {step === 1 ? (
                <BasicPropInfo
                    onBack={onBack}
                    onNext={() => setStep(2)}
                    property={mode === 'edit' ? draft : undefined}
                    onPropertyChange={updateProperty}
                    editNavigation={editNavigation}
                />
            ) : step === 2 ? (
                <AmenitiesFacilities
                    onExit={onBack} 
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                    property={mode === 'edit' ? draft : undefined}
                    onPropertyChange={updateProperty}
                    editNavigation={editNavigation}
                />
            ) : step === 3 ? (
                <PhotosMedia
                    onExit={onBack}
                    onBack={() => setStep(2)}
                    onNext={() => setStep(4)}
                    property={draft}
                    onPropertyChange={updateProperty}
                    editNavigation={editNavigation}
                />
            ) : step === 4 ? (
                <CheckInCheckOutTimesRules
                    onExit={onBack}
                    onBack={() => setStep(3)}
                    onNext={() => setStep(5)}
                    property={mode === 'edit' ? draft : undefined}
                    onPropertyChange={updateProperty}
                    editNavigation={editNavigation}
                />
            ) : step === 5 ? (
                <Bedrooms
                    onExit={onBack}
                    onBack={() => setStep(4)}
                    onNext={() => setStep(6)}
                    property={draft}
                    onPropertyChange={updateProperty}
                    editNavigation={editNavigation}
                />
            ) : step === 6 ? (
                <PropertyRulesPolicies
                    onExit={onBack}
                    onBack={() => setStep(5)}
                    onNext={() => setStep(7)}
                    property={mode === 'edit' ? draft : undefined}
                    onPropertyChange={updateProperty}
                    editNavigation={editNavigation}
                />
            ) : (
                <VerificationSubmission
                    onBack={() => setStep(6)}
                    onSubmit={(verificationFiles) => onNext?.({ ...draft, verificationFiles })}
                    property={draft}
                    onPropertyChange={updateProperty}
                    isEditing={mode === 'edit'}
                    editNavigation={editNavigation}
                />
            )}
        </main>
    )
}
