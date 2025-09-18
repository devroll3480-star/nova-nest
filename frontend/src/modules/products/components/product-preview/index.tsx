"use client"

import { useState } from "react"
import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { addToCart } from "@lib/data/cart"
import { useCart } from "@/contexts/cart-context"
import toast from "react-hot-toast"

export default function ProductPreview({
  product,
  isFeatured,
  region,
  viewMode = 'grid',
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  viewMode?: 'grid' | 'list'
}) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants?.[0]?.id || ""
  )
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { refreshCart, setShowCartPreview } = useCart()

  const { cheapestPrice } = getProductPrice({
    product,
  })

  const handleAddToCart = async () => {
    if (!selectedVariantId) {
      toast.error("Please select a variant")
      return
    }

    setIsAddingToCart(true)
    try {
      await addToCart({
        variantId: selectedVariantId,
        quantity: 1,
        countryCode: region.countries?.[0]?.iso_2 || "us",
      })
      await refreshCart() // Refresh cart state
      setShowCartPreview(true) // Show cart preview
      toast.success("Added to cart!")
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add to cart")
    } finally {
      setIsAddingToCart(false)
    }
  }

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist")
  }

  if (viewMode === 'list') {
    return (
      <div data-testid="product-wrapper" className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
            <LocalizedClientLink href={`/products/${product.handle}`} className="block">
              <Thumbnail
                thumbnail={product.thumbnail}
                images={product.images}
                size="full"
                isFeatured={isFeatured}
              />
            </LocalizedClientLink>
            
            {/* Sale Badge */}
            <div className="absolute top-1 left-1">
              <span className="bg-red-500 text-white text-xs font-medium px-1 py-0.5 rounded-full">
                New
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-lg mb-1" data-testid="product-title">
                  {product.title}
                </h3>
                
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                  {product.description || 'Premium quality product'}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(4.9)</span>
                </div>

                {/* Variant Selection */}
                {product.variants && product.variants.length > 1 && (
                  <div className="mb-2">
                    <select
                      value={selectedVariantId}
                      onChange={(e) => setSelectedVariantId(e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-black focus:border-transparent outline-none"
                    >
                      {product.variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end space-y-2 ml-4">
                {/* Price */}
                <div className="text-right">
                  {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full transition ${
                      isInWishlist
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="btn-primary-compact disabled:opacity-50"
                  >
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="product-wrapper" className="card-hover group">
      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <LocalizedClientLink href={`/products/${product.handle}`} className="block">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </LocalizedClientLink>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
            <LocalizedClientLink
              href={`/products/${product.handle}`}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </LocalizedClientLink>
            <button
              onClick={toggleWishlist}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                isInWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Sale Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            New
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-black transition" data-testid="product-title">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description || 'Premium quality product'}
        </p>

        {/* Variant Selection */}
        {product.variants && product.variants.length > 1 && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Variant:</label>
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-black focus:border-transparent outline-none"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-gray-500 ml-1">(4.9)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="btn-primary-compact disabled:opacity-50"
          >
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
