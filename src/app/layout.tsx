import { Providers } from './providers'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Assignment Dashboard',
  description: 'Track your assignments and deadlines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current path
  const headersList = headers()
  const path = headersList.get('x-invoke-path') || ''

  // If the path doesn't exist and it's not the root path, redirect to home
  if (path && path !== '/' && path !== '/login' && path !== '/register') {
    redirect('/')
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
