"use client"

import { useState, useEffect, useRef } from "react"
import { User, LogOut, UserCircle } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { retrieveCustomer } from "@lib/data/customer"
import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"

export default function AuthSection() {
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await retrieveCustomer()
        setCustomer(customerData)
      } catch (error) {
        setCustomer(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomer()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await signout("dk") // You might want to get the country code dynamically
      setCustomer(null)
      setShowDropdown(false)
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="text-gray-700 hover:text-black transition font-medium">
        Loading...
      </div>
    )
  }

  if (!customer) {
    return (
      <LocalizedClientLink
        className="btn-primary-compact"
        href="/account"
        data-testid="nav-login-link"
      >
        Login
      </LocalizedClientLink>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 text-gray-700 hover:text-black transition font-medium"
        data-testid="nav-profile-button"
      >
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <span className="hidden md:block">{customer.first_name || "Account"}</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {customer.first_name} {customer.last_name}
            </p>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
          
          <LocalizedClientLink
            href="/account"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setShowDropdown(false)}
          >
            <UserCircle className="w-4 h-4 mr-3" />
            Account
          </LocalizedClientLink>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
