import { ChakraProvider } from '@chakra-ui/react'

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
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
