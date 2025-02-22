import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const token = cookies.get('admin_token')?.value
  const isAdminPath = nextUrl.pathname.startsWith('/admin')

  // ✅ Allow non-admin routes to pass through
  if (!isAdminPath) {
    return NextResponse.next()
  }

  // ✅ If already logged in and visits /admin, redirect to dashboard
  if (nextUrl.pathname === '/admin' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // ✅ Allow access to login page
  if (nextUrl.pathname === '/admin/auth') {
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // ✅ Block access to all other admin routes if no token
  if (!token) {
    return NextResponse.redirect(new URL('/admin/auth', request.url))
  }

  return NextResponse.next()
}

// ✅ Apply middleware only to /admin routes
export const config = {
  matcher: ['/admin', '/admin/:path*']
}