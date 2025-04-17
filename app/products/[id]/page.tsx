"use client"

import Link from "next/link"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, Share2, ZoomIn, Check, Truck, Shield, RotateCw, Sparkles } from "lucide-react"
import SellerInfo from "../../components/SellerInfo"
import ReviewList from "../../components/ReviewList"
import { useCart } from "../../contexts/CartContext"
import ProductViewer3D from "../../components/ProductViewer3D"
import ARTryOn from "../../components/ARTryOn"
import PageTransition from "../../components/PageTransition"

interface Product {
  id: string
  name: string
  image: string
  price: number
  oldPrice?: number
  rating: number
  category: string
  material: string
  description: string
  seller: {
    name: string
    rating: number
    totalSales: number
  }
  reviews: {
    id: string
    reviewerName: string
    rating: number
    comment: string
    likes: number
    dislikes: number
  }[]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [view, setView] = useState<"image" | "3d" | "ar">("image")
  const [customizations, setCustomizations] = useState({
    size: "",
    engraving: "",
    metal: "",
  })
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const imageRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { addToCart } = useCart()

  // Mock multiple product images
  const productImages = [
    { id: 0, src: "/placeholder.svg?height=600&width=600", alt: "Front view" },
    { id: 1, src: "/placeholder.svg?height=600&width=600", alt: "Side view" },
    { id: 2, src: "/placeholder.svg?height=600&width=600", alt: "Back view" },
    { id: 3, src: "/placeholder.svg?height=600&width=600", alt: "Detail view" },
  ]

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
          // Fetch similar products
          fetchSimilarProducts(data.category, data.id)
        } else {
          console.error("Failed to fetch product")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }
    fetchProduct()
  }, [params.id])

  const fetchSimilarProducts = async (category: string, currentId: string) => {
    try {
      const response = await fetch(`/api/products?category=${category}`)
      if (response.ok) {
        const data = await response.json()
        // Filter out current product and limit to 3
        setSimilarProducts(data.filter((p: Product) => p.id !== currentId).slice(0, 3))
      }
    } catch (error) {
      console.error("Error fetching similar products:", error)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        // Include customizations in cart item
        customizations,
      })
      // Show success message
      alert("Product added to cart!")
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        customizations,
      })
      router.push("/checkout")
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-xl">Loading product details...</div>
      </div>
    )
  }

  // Calculate price breakdown
  const basePricePercentage = 70
  const materialCostPercentage = 20
  const craftingPercentage = 10
  const basePrice = (product.price * basePricePercentage) / 100
  const materialCost = (product.price * materialCostPercentage) / 100
  const craftingCost = (product.price * craftingPercentage) / 100

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images Section */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="md:w-1/5 order-2 md:order-1">
                <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
                  {productImages.map((img, index) => (
                    <div
                      key={img.id}
                      className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                        selectedImage === index ? "border-blue-500" : "border-transparent"
                      }`}
                      onClick={() => {
                        setSelectedImage(index)
                        setView("image")
                      }}
                    >
                      <Image
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt}
                        width={80}
                        height={80}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Image/Viewer */}
              <div className="md:w-4/5 order-1 md:order-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* View Toggle Buttons */}
                  <div className="flex border-b">
                    <button
                      className={`flex-1 py-2 px-4 text-center ${view === "image" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600"}`}
                      onClick={() => setView("image")}
                    >
                      Photos
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 text-center ${view === "3d" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600"}`}
                      onClick={() => setView("3d")}
                    >
                      3D View
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 text-center ${view === "ar" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600"}`}
                      onClick={() => setView("ar")}
                    >
                      Try On AR
                    </button>
                  </div>

                  {/* Image View */}
                  {view === "image" && (
                    <div
                      ref={imageRef}
                      className="relative h-[400px] overflow-hidden cursor-zoom-in"
                      onClick={() => setIsZoomed(!isZoomed)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setIsZoomed(false)}
                    >
                      <Image
                        src={productImages[selectedImage].src || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                      {isZoomed && (
                        <div
                          className="absolute inset-0 bg-contain bg-no-repeat z-10"
                          style={{
                            backgroundImage: `url(${productImages[selectedImage].src})`,
                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            transform: "scale(2)",
                          }}
                        />
                      )}
                      <button
                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-20"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsZoomed(!isZoomed)
                        }}
                      >
                        <ZoomIn size={20} className="text-gray-600" />
                      </button>
                    </div>
                  )}

                  {/* 3D View */}
                  {view === "3d" && (
                    <div className="h-[400px] bg-gray-50 flex items-center justify-center">
                      <ProductViewer3D productId={product.id} />
                    </div>
                  )}

                  {/* AR View */}
                  {view === "ar" && (
                    <div className="h-[400px] bg-gray-50 flex items-center justify-center">
                      <ARTryOn productId={product.id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Heart size={20} className="text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-gray-600">{product.reviews.length} Reviews</span>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-green-600 flex items-center">
                <Check size={16} className="mr-1" /> In Stock
              </span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
              {product.oldPrice && (
                <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">{product.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">{product.category}</span>
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">{product.material}</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Material Cost</span>
                  <span>${materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Crafting & Design</span>
                  <span>${craftingCost.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Customization Options</h3>

              {/* Size Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {["5", "6", "7", "8", "9", "10"].map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${
                        customizations.size === size
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setCustomizations({ ...customizations, size })}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Type */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Metal Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "gold", name: "Gold", color: "bg-yellow-400" },
                    { id: "silver", name: "Silver", color: "bg-gray-300" },
                    { id: "rosegold", name: "Rose Gold", color: "bg-red-200" },
                    { id: "platinum", name: "Platinum", color: "bg-gray-400" },
                  ].map((metal) => (
                    <button
                      key={metal.id}
                      className={`px-4 py-2 border rounded-md flex items-center ${
                        customizations.metal === metal.id
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setCustomizations({ ...customizations, metal: metal.id })}
                    >
                      <span className={`w-4 h-4 rounded-full ${metal.color} mr-2`}></span>
                      {metal.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Engraving */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Engraving (Optional)</label>
                <input
                  type="text"
                  placeholder="Add your personalized message"
                  value={customizations.engraving}
                  onChange={(e) => setCustomizations({ ...customizations, engraving: e.target.value })}
                  maxLength={20}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Max 20 characters</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-4 font-medium">
                  Quantity:
                </label>
                <div className="flex border rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 border-r">
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-none focus:outline-none"
                  />
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 border-l">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Buy Now
                </motion.button>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="mb-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center">
                  <RotateCw className="w-5 h-5 text-blue-600 mr-2" />
                  <span>30-day returns policy</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  <span>1-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mt-12">
          <SellerInfo
            name={product.seller.name}
            rating={product.seller.rating}
            totalSales={product.seller.totalSales}
          />
        </div>

        {/* Reviews */}
        <ReviewList reviews={product.reviews || []} />

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center mb-6">
              <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -10 }}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

