import { ColorModeScript } from '@chakra-ui/react'
import { Providers } from './providers'
import { Inter } from 'next/font/google'
import { extendTheme } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

export const metadata = {
  title: 'Assignment Dashboard',
  description: 'Track your assignments and deadlines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <body className={inter.className} style={{ background: '#171923' }}>
        <ColorModeScript initialColorMode="dark" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
