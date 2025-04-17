import React from 'react'

interface SellerInfoProps {
  name: string
  rating: number
  totalSales: number
}

const SellerInfo: React.FC<SellerInfoProps> = ({ name, rating, totalSales }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Seller Information</h3>
      <p className="mb-1"><span className="font-medium">Name:</span> {name}</p>
      <p className="mb-1"><span className="font-medium">Rating:</span> {rating.toFixed(1)} / 5</p>
      <p><span className="font-medium">Total Sales:</span> {totalSales}</p>
    </div>
  )
}

export default SellerInfo

