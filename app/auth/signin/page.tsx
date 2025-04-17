'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const router = useRouter()

const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (result?.ok) {
      router.push('/')
    } else {
      alert('Sign in failed. Please check your credentials.')
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  const handleSendOtp = async () => {
    try {
      // You can add validation here if needed
      if (!phoneNumber || phoneNumber.length < 10) {
        // Show error message
        return;
      }
      
      // Call your API to send OTP
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
      
      // If successful, set isOtpSent to true
      setIsOtpSent(true);
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle error (show error message to user)
    }
  }
  

  const handleOtpSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      // Validate OTP
      if (!otp || otp.length < 4) {
        setError('Please enter a valid OTP');
        return;
      }
    
      const result = await signIn('otp', {
        phoneNumber,
        otp,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error || 'Invalid OTP');
      }
      if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify OTP');
      console.error('Error verifying OTP:', err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign In</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors mb-4"
          >
            Sign in with Google
          </button>
          <div className="my-4 flex items-center justify-between">
            <hr className="w-full" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full" />
          </div>
          <form onSubmit={handleEmailSignIn} className="mb-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-secondary transition-colors"
            >
              Sign in with Email
            </button>
          </form>
          <div className="my-4 flex items-center justify-between">
            <hr className="w-full" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full" />
          </div>
          <form onSubmit={handleOtpSignIn}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex">
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full p-2 border rounded-l"
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-secondary text-white px-4 py-2 rounded-r"
                >
                  Send OTP
                </button>
              </div>
            </div>
            {isOtpSent && (
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-secondary transition-colors"
            >
              Sign in with OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

