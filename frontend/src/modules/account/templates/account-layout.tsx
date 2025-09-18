import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  // If no customer, render login/register directly without the account layout
  if (!customer) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200" data-testid="account-page">
      <div className="container-padding">
        <div className="py-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">My Account</h1>
          <p className="text-gray-600">Manage your account settings and orders</p>
        </div>
        
        <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm flex flex-col">
          <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-12">
            <div>{customer && <AccountNav customer={customer} />}</div>
            <div className="flex-1">{children}</div>
          </div>
          <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 py-12 gap-8 px-6">
            <div>
              <h3 className="text-xl-semi mb-4 text-gray-900">Got questions?</h3>
              <span className="txt-medium text-gray-600">
                You can find frequently asked questions and answers on our
                customer service page.
              </span>
            </div>
            <div>
              <UnderlineLink href="/customer-service" className="text-black hover:text-gray-800 font-medium">
                Customer Service
              </UnderlineLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
