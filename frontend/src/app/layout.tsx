import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Toaster } from "react-hot-toast"
import { CartProvider } from "@/contexts/cart-context"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <CartProvider>
          <main className="relative">{props.children}</main>
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  )
}
