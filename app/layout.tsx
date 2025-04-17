import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "./providers/AuthProvider"
import { CartProvider } from "./providers/CartProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rold Gold Jewellery",
  description: "Exquisite jewelry for every occasion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-purple-50`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

import './globals.css'