"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import CartPreview from "../cart-preview"

export default function CartPreviewButton() {
  const { cart, totalItems, showCartPreview, setShowCartPreview } = useCart()

  const handleCartClick = () => {
    setShowCartPreview(true)
  }

  return (
    <>
      <button
        onClick={handleCartClick}
        className="flex items-center space-x-2 text-gray-700 hover:text-black transition font-medium"
        data-testid="nav-cart-button"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        <span className="hidden md:block">Cart ({totalItems})</span>
      </button>

      <CartPreview
        cart={cart}
        isOpen={showCartPreview}
        onClose={() => setShowCartPreview(false)}
      />
    </>
  )
}
