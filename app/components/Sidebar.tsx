"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Star, ChevronDown, ChevronUp, X } from "lucide-react"

interface SidebarProps {
  onFilterChange: (filters: {
    priceRange: [number, number]
    rating: number
    sortBy: string
    category: string
    material: string
    occasion: string
    weight: [number, number]
    search?: string
  }) => void
  initialFilters?: {
    priceRange: [number, number]
    rating: number
    sortBy: string
    category: string
    material: string
    occasion: string
    weight: [number, number]
    search?: string
  }
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, initialFilters }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters?.priceRange || [0, 10000])
  const [rating, setRating] = useState<number>(initialFilters?.rating || 0)
  const [sortBy, setSortBy] = useState<string>(initialFilters?.sortBy || "featured")
  const [category, setCategory] = useState<string>(initialFilters?.category || "")
  const [material, setMaterial] = useState<string>(initialFilters?.material || "")
  const [occasion, setOccasion] = useState<string>(initialFilters?.occasion || "")
  const [weight, setWeight] = useState<[number, number]>(initialFilters?.weight || [0, 1000])
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    category: true,
    material: true,
    occasion: true,
    weight: true,
  })

  useEffect(() => {
    // Update local state if initialFilters change
    if (initialFilters) {
      setPriceRange(initialFilters.priceRange)
      setRating(initialFilters.rating)
      setSortBy(initialFilters.sortBy)
      setCategory(initialFilters.category)
      setMaterial(initialFilters.material)
      setOccasion(initialFilters.occasion)
      setWeight(initialFilters.weight)
    }
  }, [initialFilters])

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPriceRange = [...priceRange] as [number, number]
    newPriceRange[event.target.name === "minPrice" ? 0 : 1] = Number(event.target.value)
    setPriceRange(newPriceRange)
    onFilterChange({
      priceRange: newPriceRange,
      rating,
      sortBy,
      category,
      material,
      occasion,
      weight,
      search: initialFilters?.search,
    })
  }

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
    onFilterChange({
      priceRange,
      rating: newRating,
      sortBy,
      category,
      material,
      occasion,
      weight,
      search: initialFilters?.search,
    })
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value
    setSortBy(newSortBy)
    onFilterChange({
      priceRange,
      rating,
      sortBy: newSortBy,
      category,
      material,
      occasion,
      weight,
      search: initialFilters?.search,
    })
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value
    setCategory(newCategory)
    onFilterChange({
      priceRange,
      rating,
      sortBy,
      category: newCategory,
      material,
      occasion,
      weight,
      search: initialFilters?.search,
    })
  }

  const handleMaterialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMaterial = event.target.value
    setMaterial(newMaterial)
    onFilterChange({
      priceRange,
      rating,
      sortBy,
      category,
      material: newMaterial,
      occasion,
      weight,
      search: initialFilters?.search,
    })
  }

  const handleOccasionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOccasion = event.target.value
    setOccasion(newOccasion)
    onFilterChange({
      priceRange,
      rating,
      sortBy,
      category,
      material,
      occasion: newOccasion,
      weight,
      search: initialFilters?.search,
    })
  }

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = [...weight] as [number, number]
    newWeight[event.target.name === "minWeight" ? 0 : 1] = Number(event.target.value)
    setWeight(newWeight)
    onFilterChange({
      priceRange,
      rating,
      sortBy,
      category,
      material,
      occasion,
      weight: newWeight,
      search: initialFilters?.search,
    })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const resetFilters = () => {
    setPriceRange([0, 10000])
    setRating(0)
    setSortBy("featured")
    setCategory("")
    setMaterial("")
    setOccasion("")
    setWeight([0, 1000])
    onFilterChange({
      priceRange: [0, 10000],
      rating: 0,
      sortBy: "featured",
      category: "",
      material: "",
      occasion: "",
      weight: [0, 1000],
      search: "",
    })
  }

  const FilterSection = ({
    title,
    section,
    children,
  }: {
    title: string
    section: keyof typeof expandedSections
    children: React.ReactNode
  }) => (
    <div className="mb-6">
      <button
        className="flex justify-between items-center w-full text-left text-md font-medium mb-2"
        onClick={() => toggleSection(section)}
      >
        {title}
        {expandedSections[section] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {expandedSections[section] && <div className="mt-2">{children}</div>}
    </div>
  )

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={resetFilters} className="text-sm text-blue-600 hover:text-blue-800">
          Reset All
        </button>
      </div>

      <FilterSection title="Price Range" section="price">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="minPrice"
            value={priceRange[0]}
            onChange={handlePriceChange}
            className="w-20 p-1 border rounded"
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            name="maxPrice"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-20 p-1 border rounded"
            min="0"
          />
        </div>
        <div className="mt-2">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => {
              const newPriceRange: [number, number] = [priceRange[0], Number.parseInt(e.target.value)]
              setPriceRange(newPriceRange)
              onFilterChange({
                priceRange: newPriceRange,
                rating,
                sortBy,
                category,
                material,
                occasion,
                weight,
                search: initialFilters?.search,
              })
            }}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$10,000+</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Rating" section="rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center cursor-pointer" onClick={() => handleRatingChange(star)}>
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-sm">{star} & up</span>
              {rating === star && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRatingChange(0)
                  }}
                  className="ml-auto text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Category" section="category">
        <select value={category} onChange={handleCategoryChange} className="w-full p-2 border rounded">
          <option value="">All Categories</option>
          <option value="Necklaces">Necklaces</option>
          <option value="Rings">Rings</option>
          <option value="Bracelets">Bracelets</option>
          <option value="Earrings">Earrings</option>
          <option value="Watches">Watches</option>
          <option value="Pendants">Pendants</option>
          <option value="Anklets">Anklets</option>
          <option value="Chains">Chains</option>
          <option value="Accessories">Accessories</option>
          <option value="Body Jewelry">Body Jewelry</option>
          <option value="Wedding">Wedding & Engagement</option>
        </select>
      </FilterSection>

      <FilterSection title="Material" section="material">
        <select value={material} onChange={handleMaterialChange} className="w-full p-2 border rounded">
          <option value="">All Materials</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Platinum">Platinum</option>
          <option value="Diamond">Diamond</option>
          <option value="Pearl">Pearl</option>
          <option value="Ruby">Ruby</option>
          <option value="Sapphire">Sapphire</option>
          <option value="Emerald">Emerald</option>
          <option value="Rose Gold">Rose Gold</option>
          <option value="Opal">Opal</option>
          <option value="Titanium">Titanium</option>
          <option value="Amethyst">Amethyst</option>
          <option value="Topaz">Topaz</option>
          <option value="Citrine">Citrine</option>
        </select>
      </FilterSection>

      <FilterSection title="Occasion" section="occasion">
        <select value={occasion} onChange={handleOccasionChange} className="w-full p-2 border rounded">
          <option value="">All Occasions</option>
          <option value="Wedding">Wedding</option>
          <option value="Engagement">Engagement</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Birthday">Birthday</option>
          <option value="Graduation">Graduation</option>
          <option value="Everyday">Everyday</option>
          <option value="Party">Party & Events</option>
          <option value="Gift">Gift</option>
        </select>
      </FilterSection>

      <FilterSection title="Weight (grams)" section="weight">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="minWeight"
            value={weight[0]}
            onChange={handleWeightChange}
            className="w-20 p-1 border rounded"
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            name="maxWeight"
            value={weight[1]}
            onChange={handleWeightChange}
            className="w-20 p-1 border rounded"
            min="0"
          />
        </div>
      </FilterSection>

      <div>
        <h3 className="text-md font-medium mb-2">Sort By</h3>
        <select value={sortBy} onChange={handleSortChange} className="w-full p-2 border rounded">
          <option value="featured">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest First</option>
          <option value="bestselling">Best Selling</option>
        </select>
      </div>
    </div>
  )
}

export default Sidebar

