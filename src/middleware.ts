import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for API routes and static files
  if (path.startsWith('/api/') || 
      path.startsWith('/_next/') || 
      path.includes('.')) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get('token')

  // If it's the login or register page and we have a token, redirect to home
  if ((path === '/login' || path === '/register') && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If it's not login/register and we don't have a token, redirect to login
  if (path !== '/login' && path !== '/register' && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
