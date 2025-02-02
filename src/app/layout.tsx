import { ColorModeScript } from '@chakra-ui/react'
import { Providers } from './providers'
import { Inter } from 'next/font/google'
import theme from './theme'

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
