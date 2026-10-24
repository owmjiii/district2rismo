import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
    PaymentElement,
    CheckoutElementsProvider,
    useCheckoutElements,
} from '@stripe/react-stripe-js/checkout'

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
)

const API_URL =
    import.meta.env.VITE_PAYMENT_API_URL || 'http://localhost:4242'

function PaymentForm() {
    const checkoutState = useCheckoutElements()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')


    const handlePayment = async (event) => {
        event.preventDefault()

        if (checkoutState.type !== 'success' || loading) {
            return
        }

        setLoading(true)
        setErrorMessage('')

        try {
            const result = await checkoutState.checkout.confirm({
            email: email.trim(),
        })

            if (result.type === 'error') {
                setErrorMessage(
                    result.error.message || 'Payment could not be completed.'
                )
            }
        } catch (error) {
            setErrorMessage(
                error.message || 'Something went wrong. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    if (checkoutState.type === 'error') {
        return (
            <p className="payment-error" role="alert">
                {checkoutState.error.message || 'Unable to load checkout.'}
            </p>
        )
    }

    if (checkoutState.type !== 'success') {
        return <p>Preparing secure payment form...</p>
    }

    return (
        <form onSubmit={handlePayment}>
            <div className="stripe-payment-box">
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </label>
                <PaymentElement />
            </div>

            {errorMessage && (
                <p className="payment-error" role="alert">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                className="button next-btn"
                disabled={loading}            >
                {loading ? 'Processing...' : 'Pay securely'}
            </button>

            <p className="pay-note">
                Your card payment is processed securely by Stripe.
            </p>
        </form>
    )
}

export default function StripePaymentN({ booking, payOption }) {
    const [clientSecret, setClientSecret] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(true)

    const adultCount = booking?.guests?.adult
    const kidsCount = booking?.guests?.kids
    const seniorCount = booking?.guests?.senior
    const session = booking?.session
    const date = booking?.date
    const cottageName = booking?.cottage?.name
    const resortName = booking?.resort?.name

    useEffect(() => {
        const controller = new AbortController()

        async function createCheckoutSession() {
            setLoading(true)
            setErrorMessage('')
            setClientSecret('')

            try {
                const response = await fetch(
                    `${API_URL}/create-checkout-session`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            booking: {
                                guests: {
                                    adult: adultCount,
                                    kids: kidsCount,
                                    senior: seniorCount,
                                },
                                session,
                                date,
                                cottageName,
                                resortName,
                            },
                            payOption,
                        }),
                        signal: controller.signal,
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Could not start checkout.')
                }

                if (!data.clientSecret) {
                    throw new Error('Stripe did not return a checkout secret.')
                }

                setClientSecret(data.clientSecret)
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setErrorMessage(error.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        createCheckoutSession()

        return () => controller.abort()
    }, [
        adultCount,
        kidsCount,
        seniorCount,
        session,
        date,
        cottageName,
        resortName,
        payOption,
    ])

    if (loading) {
        return <p>Preparing secure payment form...</p>
    }

    if (errorMessage) {
        return (
            <p className="payment-error" role="alert">
                {errorMessage}
            </p>
        )
    }

    if (!clientSecret) {
        return <p>Could not prepare payment. Please try again.</p>
    }

    return (
        <CheckoutElementsProvider
            key={clientSecret}
            stripe={stripePromise}
            options={{
                clientSecret,
                elementsOptions: {
                    appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#7457e8',
                            borderRadius: '9px',
                        },
                    },
                },
            }}
        >
            <PaymentForm />
        </CheckoutElementsProvider>
    )
}