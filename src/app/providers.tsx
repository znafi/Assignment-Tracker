'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import theme from './theme'
import { useEffect } from 'react'

function ColorModeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorMode } = useColorMode()
  
  useEffect(() => {
    setColorMode('dark')
  }, [setColorMode])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme} resetCSS>
        <ColorModeWrapper>
          {children}
        </ColorModeWrapper>
      </ChakraProvider>
    </CacheProvider>
  )
}
