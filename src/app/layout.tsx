import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Providers } from './providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Assignment Dashboard',
  description: 'Track and manage your assignments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorModeScript initialColorMode="dark" />
        <ChakraProvider>
          <Providers>
            {children}
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  )
}
