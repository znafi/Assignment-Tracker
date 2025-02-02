import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define valid paths
const PUBLIC_PATHS = ['/login']
const PROTECTED_PATHS = ['/']
const STATIC_FILE_EXTENSIONS = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for API routes and static files
  if (path.startsWith('/api/') || 
      path.startsWith('/_next/') || 
      STATIC_FILE_EXTENSIONS.some(ext => path.endsWith(ext))) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get('token')?.value

  // If we have a token and try to access public routes (like login), redirect to home
  if (token && PUBLIC_PATHS.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If we don't have a token and try to access protected routes, redirect to login
  if (!token && PROTECTED_PATHS.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // For any other paths, let Next.js handle 404s
  if (!PUBLIC_PATHS.includes(path) && !PROTECTED_PATHS.includes(path)) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

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
