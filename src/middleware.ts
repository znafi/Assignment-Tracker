import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected, /auth)
  const path = request.nextUrl.pathname

  // If it's the auth page and we have a token, redirect to home page
  if (path === '/auth') {
    if (request.cookies.has('token')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // If it's not the auth page and we don't have a token, redirect to auth page
  if (path !== '/auth') {
    if (!request.cookies.has('token')) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
