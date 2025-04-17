"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const errorType = searchParams?.get("error")
    let errorMessage = "An unknown error occurred"

    // Handle different error types
    switch (errorType) {
      case "Configuration":
        errorMessage = "There is a problem with the server configuration."
        break
      case "AccessDenied":
        errorMessage = "You do not have access to this resource."
        break
      case "Verification":
        errorMessage = "The verification token has expired or has already been used."
        break
      case "OAuthSignin":
        errorMessage = "Error in the OAuth sign-in process."
        break
      case "OAuthCallback":
        errorMessage = "Error in the OAuth callback process."
        break
      case "OAuthCreateAccount":
        errorMessage = "Could not create OAuth provider user in the database."
        break
      case "EmailCreateAccount":
        errorMessage = "Could not create email provider user in the database."
        break
      case "Callback":
        errorMessage = "Error in the OAuth callback handler."
        break
      case "OAuthAccountNotLinked":
        errorMessage = "The email on the account is already linked, but not with this OAuth account."
        break
      case "EmailSignin":
        errorMessage = "The email could not be sent."
        break
      case "CredentialsSignin":
        errorMessage = "The credentials you provided were invalid."
        break
      case "SessionRequired":
        errorMessage = "You must be signed in to access this page."
        break
      default:
        errorMessage = "An unknown error occurred during authentication."
    }

    setError(errorMessage)
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mb-6 text-gray-700">{error}</p>
        <div className="flex flex-col space-y-4">
          <Link href="/auth/signin" className="rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700">
            Try signing in again
          </Link>
          <Link href="/" className="rounded border border-gray-300 px-4 py-2 text-center hover:bg-gray-50">
            Return to home page
          </Link>
        </div>
      </div>
    </div>
  )
}

