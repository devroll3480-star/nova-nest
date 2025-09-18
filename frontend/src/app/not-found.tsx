import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import Header from '@/modules/layout/templates/nav'
import Footer from '@/modules/layout/templates/footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-full max-w-md mx-auto mb-8">
            <img 
              src="/404-illustration.svg" 
              alt="Page eaten illustration" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Sorry, page eaten!
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for seems to have been devoured by our hungry dog. 
            Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <Link
            href="javascript:history.back()"
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p className="text-gray-500 mb-4">Or try one of these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="text-black hover:text-gray-600 transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-black hover:text-gray-600 transition-colors">
              Categories
            </Link>
            <Link href="/profile" className="text-black hover:text-gray-600 transition-colors">
              Profile
            </Link>
            <Link href="/wishlist" className="text-black hover:text-gray-600 transition-colors">
              Wishlist
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
