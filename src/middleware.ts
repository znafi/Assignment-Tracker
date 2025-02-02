import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Skip middleware for API routes and static files
  if (path.startsWith('/api/') || 
      path.startsWith('/_next/') || 
      path.includes('.')) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get('token')?.value

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register']
  
  // If we're on a public route and have a token, redirect to home
  if (publicRoutes.includes(path) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If we're not on a public route and don't have a token, redirect to login
  if (!publicRoutes.includes(path) && !token && path !== '/') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
