"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../contexts/CartContext"
import CartDrawer from "./CartDrawer"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { cart } = useCart()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
      setIsSearchOpen(false)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md text-gray-800" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <motion.span
                    className={`text-2xl font-bold ${isScrolled ? "text-blue-600" : "text-white"}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    Rold Gold Jewellery
                  </motion.span>
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {navItems.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -2 }}>
                  <Link
                    href={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === item.path
                        ? isScrolled
                          ? "text-blue-600"
                          : "text-yellow-300"
                        : isScrolled
                          ? "text-gray-700 hover:text-blue-600"
                          : "text-white hover:text-yellow-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              <motion.button whileHover={{ y: -2 }} className="p-2" onClick={() => setIsSearchOpen(true)}>
                <Search className={`h-5 w-5 ${isScrolled ? "text-gray-700" : "text-white"}`} />
              </motion.button>

              <motion.div whileHover={{ y: -2 }} className="relative">
                <button onClick={() => setIsCartOpen(true)} className="p-2">
                  <ShoppingCart className={`h-5 w-5 ${isScrolled ? "text-gray-700" : "text-white"}`} />
                  {cartItemsCount > 0 && (
                    <span className="absolute top-0 right-0 bg-yellow-300 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </motion.div>

              {session ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => signOut()}
                    className={`ml-4 ${
                      isScrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-blue-600 hover:bg-yellow-300"
                    }`}
                  >
                    Sign Out
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => signIn()}
                    className={`ml-4 ${
                      isScrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-blue-600 hover:bg-yellow-300"
                    }`}
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-yellow-300"
                } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="sm:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname === item.path
                        ? isScrolled
                          ? "text-blue-600"
                          : "text-yellow-300"
                        : isScrolled
                          ? "text-gray-700 hover:text-blue-600"
                          : "text-white hover:text-yellow-300"
                    }`}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-yellow-300"
                  }`}
                  onClick={() => {
                    toggleMenu()
                    setIsCartOpen(true)
                  }}
                >
                  Cart ({cartItemsCount})
                </Link>
                {session ? (
                  <Button
                    onClick={() => signOut()}
                    className={`w-full mt-2 ${
                      isScrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-blue-600 hover:bg-yellow-300"
                    }`}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    onClick={() => signIn()}
                    className={`w-full mt-2 ${
                      isScrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-blue-600 hover:bg-yellow-300"
                    }`}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-0 left-0 right-0 bg-white p-4 shadow-md z-50"
            >
              <form onSubmit={handleSearchSubmit} className="relative max-w-3xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-5 pr-12 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  autoFocus
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                  <Search size={20} />
                </button>
                <button
                  type="button"
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X size={20} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  )
}

export default Navbar

