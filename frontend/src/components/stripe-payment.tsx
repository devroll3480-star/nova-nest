"use client"

import { 
  CardElement, 
  Elements, 
  useElements, 
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import { sdk } from "@/lib/config"

const stripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PK || process.env.NEXT_PUBLIC_STRIPE_KEY || "temp"
)

export default function StripePayment() {
  const { cart } = useCart()
  const clientSecret = cart?.payment_collection?.
    payment_sessions?.[0]?.data?.client_secret as string

  if (!clientSecret) {
    return <div>Loading payment form...</div>
  }

  return (
    <div>
      <Elements stripe={stripe} options={{
          clientSecret,
        }}>
        <StripeForm clientSecret={clientSecret} />
      </Elements>
    </div>
  )
}

const StripeForm = ({ 
  clientSecret,
}: {
  clientSecret: string
}) => {
  const { cart, refreshCart } = useCart()
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  async function handlePayment(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    const card = elements?.getElement(CardElement)

    if (
      !stripe || 
      !elements ||
      !card ||
      !cart ||
      !clientSecret
    ) {
      return
    }

    setLoading(true)
    
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: `${cart.billing_address?.first_name || ''} ${cart.billing_address?.last_name || ''}`.trim(),
            email: cart.email,
            phone: cart.billing_address?.phone,
            address: {
              city: cart.billing_address?.city,
              country: cart.billing_address?.country_code,
              line1: cart.billing_address?.address_1,
              line2: cart.billing_address?.address_2,
              postal_code: cart.billing_address?.postal_code,
            },
          },
        },
      })

      if (error) {
        console.error('Payment failed:', error)
        return
      }

      if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'requires_capture')) {
        const data = await sdk.store.cart.complete(cart.id)
        
        if (data.type === "cart" && data.cart) {
          // an error occurred
          console.error('Cart completion failed:', data.error)
        } else if (data.type === "order" && data.order) {
          // Order placed successfully
          alert("Order placed successfully!")
          console.log('Order:', data.order)
          refreshCart()
        }
      }
    } catch (err) {
      console.error('Payment error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  )
}
