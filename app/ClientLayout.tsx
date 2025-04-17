"use client"

import type React from "react"

import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { SessionProvider } from "next-auth/react"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { CartProvider } from "./contexts/CartContext"
import CursorEffect from "./components/CursorEffect"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-purple-50`}>
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <AnimatePresence mode="wait">
              <main key={pathname}>{children}</main>
            </AnimatePresence>
            <Footer />
            <CursorEffect />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

