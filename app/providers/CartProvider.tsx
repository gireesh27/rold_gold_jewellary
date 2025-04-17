"use client"

import type React from "react"
import { CartProvider as CartContextProvider } from "../contexts/CartContext"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CursorEffect from "../components/CursorEffect"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <CartContextProvider>
      <Navbar />
      <AnimatePresence mode="wait">
        <main key={pathname}>{children}</main>
      </AnimatePresence>
      <Footer />
      <CursorEffect />
    </CartContextProvider>
  )
}

