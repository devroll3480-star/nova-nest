"use client"

import { useState, useEffect, useRef } from "react"
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import { useCart } from "@/contexts/cart-context"
import { toast } from "react-hot-toast"

interface CartPreviewProps {
  cart: HttpTypes.StoreCart | null
  isOpen: boolean
  onClose: () => void
}

export default function CartPreview({ cart, isOpen, onClose }: CartPreviewProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { refreshCart } = useCart()

  const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const subtotal = cart?.subtotal ?? 0

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleQuantityUpdate = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(true)
    try {
      await updateLineItem({ lineId: itemId, quantity: newQuantity })
      await refreshCart() // Refresh cart state
      toast.success("Quantity updated")
    } catch (error) {
      toast.error("Failed to update quantity")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    setIsUpdating(true)
    try {
      await deleteLineItem(itemId)
      await refreshCart() // Refresh cart state
      toast.success("Item removed from cart")
    } catch (error) {
      toast.error("Failed to remove item")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleClearCart = async () => {
    if (!cart?.items) return

    setIsUpdating(true)
    try {
      // Remove all items
      await Promise.all(cart.items.map(item => deleteLineItem(item.id)))
      await refreshCart() // Refresh cart state
      toast.success("Cart cleared")
    } catch (error) {
      toast.error("Failed to clear cart")
    } finally {
      setIsUpdating(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl" ref={modalRef}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart && cart.items?.length ? (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Thumbnail
                      thumbnail={item.thumbnail}
                      images={item.variant?.product?.images}
                      size="square"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.variant?.title || "One Size"}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {convertToLocale({
                        amount: item.unit_price || 0,
                        currency_code: cart.currency_code,
                      })}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                      disabled={isUpdating || item.quantity <= 1}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                      disabled={isUpdating}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isUpdating}
                    className="p-1 hover:bg-gray-200 rounded-full transition disabled:opacity-50"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some items to get started</p>
              <LocalizedClientLink
                href="/store"
                className="btn-primary"
                onClick={onClose}
              >
                Continue Shopping
              </LocalizedClientLink>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items?.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-lg font-semibold text-gray-900">
                {convertToLocale({
                  amount: subtotal,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <LocalizedClientLink
                href="/checkout"
                className="w-full bg-black text-white rounded-lg px-6 py-3 flex items-center justify-center font-medium hover:bg-gray-800 transition"
                onClick={onClose}
              >
                Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </LocalizedClientLink>
              
              <div className="flex space-x-3">
                <LocalizedClientLink
                  href="/store"
                  className="flex-1 bg-white text-black border border-gray-300 rounded-lg px-6 py-3 text-center font-medium hover:bg-gray-50 transition"
                  onClick={onClose}
                >
                  Continue Shopping
                </LocalizedClientLink>
                
                <button
                  onClick={handleClearCart}
                  disabled={isUpdating}
                  className="text-sm text-gray-500 hover:text-gray-700 transition disabled:opacity-50"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
