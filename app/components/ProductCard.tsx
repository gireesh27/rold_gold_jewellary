"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { useCart } from "../contexts/CartContext"

interface ProductCardProps {
  id: string
  name: string
  image: string
  price: number
  oldPrice?: number
  rating: number
  description: string
  category?: string
  material?: string
  viewMode?: "grid" | "list"
  isRecommended?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  oldPrice,
  rating,
  description,
  category,
  material,
  viewMode = "grid",
  isRecommended = false,
}) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ id, name, price, quantity: 1 })
  }

  if (viewMode === "list") {
    return (
      <motion.div whileHover={{ y: -5 }} className="bg-white shadow-md rounded-lg overflow-hidden flex">
        <Link href={`/products/${id}`} className="block w-1/3">
          <div className="relative h-full">
            <Image
              src={image || "/placeholder.svg?height=300&width=300"}
              alt={name}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
            {isRecommended && (
              <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                AI Recommended
              </div>
            )}
          </div>
        </Link>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold mb-1 text-blue-600">{name}</h3>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {description ? `${description.substring(0, 150)}...` : "No description available"}
            </p>
            {category && material && (
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{category}</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{material}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
              {oldPrice && <span className="ml-2 text-sm text-gray-500 line-through">${oldPrice.toFixed(2)}</span>}
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/products/${id}`}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Eye size={20} className="text-gray-600" />
              </Link>
              <button
                onClick={handleAddToCart}
                className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ y: -10 }} className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link href={`/products/${id}`} className="block relative">
        <Image
          src={image || "/placeholder.svg?height=300&width=300"}
          alt={name}
          width={300}
          height={300}
          className="w-full h-48 object-cover"
        />
        {isRecommended && (
          <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            AI Recommended
          </div>
        )}
        <div className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={20} className="text-gray-400 hover:text-red-500 transition-colors" />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {description ? `${description.substring(0, 100)}...` : "No description available"}
        </p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
          {oldPrice && <span className="ml-2 text-sm text-gray-500 line-through">${oldPrice.toFixed(2)}</span>}
        </div>
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </motion.button>
          <Link href={`/products/${id}`} className="text-blue-600 hover:text-blue-700 flex items-center">
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

