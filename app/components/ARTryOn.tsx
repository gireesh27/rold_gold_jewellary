"use client"

import { useState, useEffect } from "react"
import { Camera, QrCode } from "lucide-react"

export default function ARTryOn({ productId }: { productId: string }) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null)
  const [qrMode, setQrMode] = useState(false)

  useEffect(() => {
    // Check if WebXR is supported
    if (typeof window !== "undefined") {
      if ("xr" in navigator) {
        setIsSupported(true)
      } else {
        setIsSupported(false)
      }
    }
  }, [])

  const handleLaunchAR = () => {
    // In a real implementation, this would launch the AR experience
    // For now, we'll just show a message
    alert("AR experience would launch here. This is a placeholder.")
  }

  if (isSupported === null) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse">Checking AR compatibility...</div>
      </div>
    )
  }

  if (isSupported === false) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="mb-4 text-amber-500">
          <Camera size={48} />
        </div>
        <h3 className="text-lg font-medium mb-2">AR Not Supported</h3>
        <p className="text-gray-600 mb-4">
          Your device or browser doesn't support AR experiences. Try using the latest version of Safari on iOS or Chrome
          on Android.
        </p>
        <button
          onClick={() => setQrMode(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try on Mobile Device
        </button>
      </div>
    )
  }

  if (qrMode) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="mb-4">
          <QrCode size={160} />
        </div>
        <h3 className="text-lg font-medium mb-2">Scan to Try On</h3>
        <p className="text-gray-600 mb-4">
          Scan this QR code with your mobile device to experience this product in AR.
        </p>
        <button
          onClick={() => setQrMode(false)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="mb-4 text-blue-600">
        <Camera size={48} />
      </div>
      <h3 className="text-lg font-medium mb-2">Try On with AR</h3>
      <p className="text-gray-600 mb-4">
        See how this {productId.includes("ring") ? "ring" : "jewelry"} looks on you using augmented reality.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleLaunchAR}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Launch AR
        </button>
        <button
          onClick={() => setQrMode(true)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          QR Code
        </button>
      </div>
    </div>
  )
}

