"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

interface CartContextType {
  cart: HttpTypes.StoreCart | null
  totalItems: number
  isLoading: boolean
  refreshCart: () => Promise<void>
  showCartPreview: boolean
  setShowCartPreview: (show: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCartPreview, setShowCartPreview] = useState(false)

  const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const refreshCart = async () => {
    try {
      const cartData = await retrieveCart()
      setCart(cartData)
    } catch (error) {
      console.error("Failed to fetch cart:", error)
      setCart(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        isLoading,
        refreshCart,
        showCartPreview,
        setShowCartPreview,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
