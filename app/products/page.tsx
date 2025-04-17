"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Grid, List, SlidersHorizontal, X } from "lucide-react"
import ProductCard from "../components/ProductCard"
import Sidebar from "../components/Sidebar"
import PageTransition from "../components/PageTransition"

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
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 10000] as [number, number],
    rating: 0,
    sortBy: "featured",
    category: searchParams.get("category") || "",
    material: searchParams.get("material") || "",
    search: searchParams.get("search") || "",
    occasion: "",
    weight: [0, 1000] as [number, number],
  })

  useEffect(() => {
    fetchProducts()
    fetchRecommendedProducts()
  }, [filters])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams({
        minPrice: filters.priceRange[0].toString(),
        maxPrice: filters.priceRange[1].toString(),
        minRating: filters.rating.toString(),
        sortBy: filters.sortBy,
        category: filters.category,
        material: filters.material,
        search: filters.search,
        occasion: filters.occasion,
        minWeight: filters.weight[0].toString(),
        maxWeight: filters.weight[1].toString(),
      })

      const response = await fetch(`/api/products?${queryParams}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecommendedProducts = async () => {
    // In a real app, this would be an API call based on user behavior/preferences
    // For now, we'll use mock data
    try {
      const response = await fetch("/api/products?recommended=true")
      const data = await response.json()
      setRecommendedProducts(data.slice(0, 3))
    } catch (error) {
      console.error("Error fetching recommended products:", error)
    }
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Our Products</h1>
            <p className="text-gray-600">{products.length} items found</p>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            {/* View Mode Toggle */}
            <div className="flex items-center mr-4 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-500"}`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-500"}`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>

            {/* Mobile Filters Button */}
            <button
              className="md:hidden flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-full md:w-1/4">
            <Sidebar onFilterChange={handleFilterChange} initialFilters={filters} />
          </div>

          {/* Mobile Filters Sidebar */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setMobileFiltersOpen(false)}
              ></div>
              <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <h2 className="text-lg font-medium">Filters</h2>
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => setMobileFiltersOpen(false)}>
                        <X size={24} />
                      </button>
                    </div>
                    <div className="flex-1 px-4 py-6">
                      <Sidebar onFilterChange={handleFilterChange} initialFilters={filters} />
                    </div>
                    <div className="border-t px-4 py-3">
                      <button
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="w-full md:w-3/4">
            {/* AI Recommendations Section */}
            {recommendedProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">AI</span>
                  Recommended For You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} isRecommended={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4 h-96 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                    <div className="bg-gray-200 h-6 rounded-md w-3/4 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded-md w-1/2 mb-4"></div>
                    <div className="bg-gray-200 h-10 rounded-md w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* No Results */}
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                    <button
                      onClick={() =>
                        setFilters({
                          priceRange: [0, 10000],
                          rating: 0,
                          sortBy: "featured",
                          category: "",
                          material: "",
                          search: "",
                          occasion: "",
                          weight: [0, 1000],
                        })
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Grid View */}
                    {viewMode === "grid" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                          <ProductCard key={product.id} {...product} />
                        ))}
                      </div>
                    )}

                    {/* List View */}
                    {viewMode === "list" && (
                      <div className="space-y-6">
                        {products.map((product) => (
                          <ProductCard key={product.id} {...product} viewMode="list" />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

