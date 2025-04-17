"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PageTransition from "./components/PageTransition"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [personalizedProducts, setPersonalizedProducts] = useState([
    { id: "5", name: "Platinum Watch", image: "/placeholder.svg?height=300&width=300", price: 2999.99 },
    { id: "9", name: "Diamond Tennis Bracelet", image: "/placeholder.svg?height=300&width=300", price: 2499.99 },
    { id: "11", name: "Emerald Necklace", image: "/placeholder.svg?height=300&width=300", price: 1799.99 },
  ])
  const [trendingProducts, setTrendingProducts] = useState([
    { id: "1", name: "Gold Necklace", image: "/placeholder.svg?height=300&width=300", price: 999.99 },
    { id: "2", name: "Diamond Ring", image: "/placeholder.svg?height=300&width=300", price: 1499.99 },
    { id: "18", name: "Diamond Stud Earrings", image: "/placeholder.svg?height=300&width=300", price: 999.99 },
  ])

  useEffect(() => {
    const heroElement = heroRef.current
    const featuredElement = featuredRef.current

    gsap.from(heroElement, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: heroElement,
        start: "top 80%",
      },
    })

    gsap.from(featuredElement, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: featuredElement,
        start: "top 80%",
      },
    })

    // Simulate fetching personalized recommendations
    const fetchPersonalizedRecommendations = async () => {
      // In a real app, this would be an API call based on user behavior/preferences
      // For now, we'll use the mock data already set
    }

    fetchPersonalizedRecommendations()
  }, [])

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate API call for search suggestions
      const suggestions = ["Gold Necklace", "Diamond Ring", "Gold Earrings", "Gold Bracelet", "Diamond Pendant"].filter(
        (item) => item.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchSuggestions(suggestions)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Banner with Search */}
        <section ref={heroRef} className="relative mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Exquisite Jewelry for Every Occasion</h1>
              <p className="text-xl mb-8">Discover our collection of handcrafted, premium jewelry pieces.</p>

              {/* Search Bar with Auto-suggestions */}
              <div className="relative max-w-xl mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search for jewelry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 px-5 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                    <Search size={20} />
                  </button>
                  {searchQuery && (
                    <button
                      type="button"
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchQuery("")}
                    >
                      <X size={16} />
                    </button>
                  )}
                </form>

                {/* Auto-suggestions dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
                    <ul className="py-1">
                      {searchSuggestions.map((suggestion, index) => (
                        <li key={index}>
                          <Link
                            href={`/products?search=${encodeURIComponent(suggestion)}`}
                            className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                          >
                            {suggestion}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link
                    href="/products"
                    className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Recommendations */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Recommended For You</h2>
            <Link href="/products?recommended=true" className="text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalizedProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                    <div className="mt-3 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                      AI Recommended
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section ref={featuredRef} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Wedding Collection",
                image: "/placeholder.svg?height=400&width=400",
                link: "/products?category=Wedding",
              },
              {
                title: "Diamond Essentials",
                image: "/placeholder.svg?height=400&width=400",
                link: "/products?material=Diamond",
              },
              {
                title: "Gold Classics",
                image: "/placeholder.svg?height=400&width=400",
                link: "/products?material=Gold",
              },
            ].map((collection, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden relative"
              >
                <Link href={collection.link}>
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-semibold mb-2">{collection.title}</h3>
                      <p className="mb-4">Explore the collection</p>
                      <span className="text-yellow-300 font-medium">Shop Now →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Link href="/products?trending=true" className="text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Trending
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Handcrafted by expert artisans using the finest materials",
                icon: "💎",
              },
              {
                title: "Unique Designs",
                description: "Exclusive collections you won't find anywhere else",
                icon: "✨",
              },
              {
                title: "Excellent Service",
                description: "Personalized shopping experience with expert guidance",
                icon: "👑",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

