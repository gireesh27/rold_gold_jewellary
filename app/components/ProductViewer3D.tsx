"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react"
import type * as THREE from "three"

// Model component that loads and displays the 3D model
function Model({ productId }: { productId: string }) {
  // For a real implementation, you would use different models based on productId
  // For now, we'll use the sample duck model
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (modelRef.current) {
      // Gentle auto-rotation
      modelRef.current.rotation.y += 0.005
    }
  })

  return <primitive ref={modelRef} object={scene} scale={2} position={[0, -1, 0]} />
}

// Controls component for zoom and reset
function ViewerControls() {
  const { camera, gl } = useThree()
  const controlsRef = useRef<any>(null)

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const handleZoomIn = () => {
    camera.position.z *= 0.8
  }

  const handleZoomOut = () => {
    camera.position.z *= 1.2
  }

  return (
    <>
      <OrbitControls ref={controlsRef} enablePan={false} minDistance={2} maxDistance={10} target={[0, 0, 0]} />

      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button onClick={handleZoomIn} className="p-2 bg-white rounded-full shadow-md">
          <ZoomIn size={20} className="text-gray-700" />
        </button>
        <button onClick={handleZoomOut} className="p-2 bg-white rounded-full shadow-md">
          <ZoomOut size={20} className="text-gray-700" />
        </button>
        <button onClick={handleReset} className="p-2 bg-white rounded-full shadow-md">
          <RotateCw size={20} className="text-gray-700" />
        </button>
      </div>
    </>
  )
}

// Loading component
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading 3D model...</p>
    </div>
  )
}

// Main component
export default function ProductViewer3D({ productId }: { productId: string }) {
  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <Model productId={productId} />
          <ViewerControls />

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2} far={4} />
          <Environment preset="studio" />
        </Canvas>
      </Suspense>

      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}

