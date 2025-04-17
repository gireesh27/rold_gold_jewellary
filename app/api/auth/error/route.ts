import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const error = searchParams.get("error") || "Unknown error"

  // Redirect to our custom error page with the error parameter
  return NextResponse.redirect(new URL(`/auth/error?error=${error}`, request.url))
}

