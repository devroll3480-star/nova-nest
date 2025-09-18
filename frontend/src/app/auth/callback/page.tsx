"use client"

import { HttpTypes } from "@medusajs/types"
import { useEffect, useMemo, useState } from "react"
import { decodeToken } from "react-jwt"
import { useRouter } from "next/navigation"
import { sdk } from "@/lib/config"
import toast from "react-hot-toast"

export default function AuthCallback() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer>()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  // Get query parameters
  const queryParams = useMemo(() => {
    if (typeof window === "undefined") return {}
    const searchParams = new URLSearchParams(window.location.search)
    return Object.fromEntries(searchParams.entries())
  }, [])

  const sendCallback = async () => {
    let token = ""

    try {
      token = await sdk.auth.callback(
        "customer", 
        "google", 
        // pass all query parameters received from the
        // third party provider
        queryParams
      )
    } catch (error) {
      console.error("Authentication Failed:", error)
      throw error
    }

    return token
  }

  const createCustomer = async () => {
    // create customer
    await sdk.store.customer.create({
      email: "example@medusajs.com",
    })
  }

  const refreshToken = async () => {
    // refresh the token
    const result = await sdk.auth.refresh()
  }

  const validateCallback = async () => {
    try {
      const token = await sendCallback()

      const shouldCreateCustomer = (decodeToken(token) as { actor_id: string }).actor_id === ""

      if (shouldCreateCustomer) {
        await createCustomer()
        await refreshToken()
      }

      // all subsequent requests are authenticated
      const { customer: customerData } = await sdk.store.customer.retrieve()

      setCustomer(customerData)
      setStatus("success")
      setMessage("Successfully signed in with Google!")
      toast.success("Successfully signed in with Google!")
      
      setLoading(false)
      
      // Redirect to home page
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (error: any) {
      console.error("Google auth callback error:", error)
      setStatus("error")
      setMessage(error.message || "Authentication failed")
      toast.error("Authentication failed. Please try again.")
      setLoading(false)
      
      // Redirect to login page after error
      setTimeout(() => {
        router.push("/account")
      }, 2000)
    }
  }

  useEffect(() => {
    if (!loading) {
      return
    }

    validateCallback()
  }, [loading])

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Novastore</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          {status === "loading" && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Authenticating...</h3>
              <p className="text-gray-600">Please wait while we sign you in with Google.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600">{message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
