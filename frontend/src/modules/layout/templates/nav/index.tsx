import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartPreviewButton from "@modules/layout/components/cart-preview-button"
import SideMenu from "@modules/layout/components/side-menu"
import AuthSection from "@modules/layout/components/auth-section"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <LocalizedClientLink href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Novastore</span>
            </LocalizedClientLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <LocalizedClientLink href="/" className="text-gray-700 hover:text-black transition font-medium">
                Home
              </LocalizedClientLink>
              <LocalizedClientLink href="/store" className="text-gray-700 hover:text-black transition font-medium">
                Products
              </LocalizedClientLink>
              <LocalizedClientLink href="/categories" className="text-gray-700 hover:text-black transition font-medium">
                Categories
              </LocalizedClientLink>
              <div className="h-full">
                <SideMenu regions={regions} />
              </div>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field pl-4 pr-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center gap-x-6 h-full">
                <AuthSection />
              </div>
              <CartPreviewButton />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
