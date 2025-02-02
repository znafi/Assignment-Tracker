'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    gray: {
      "50": "#F7FAFC",
      "100": "#EDF2F7",
      "200": "#E2E8F0",
      "300": "#CBD5E0",
      "400": "#A0AEC0",
      "500": "#718096",
      "600": "#4A5568",
      "700": "#2D3748",
      "800": "#1A202C",
      "900": "#171923"
    }
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: 'gray.900',
        color: 'whiteAlpha.900',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'gray.800',
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'blue.400',
      },
      variants: {
        outline: {
          field: {
            bg: 'gray.800',
            borderColor: 'gray.600',
            _hover: {
              borderColor: 'gray.500',
            },
          },
        },
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'blue.400',
      },
      variants: {
        outline: {
          field: {
            bg: 'gray.800',
            borderColor: 'gray.600',
            _hover: {
              borderColor: 'gray.500',
            },
          },
        },
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme} resetCSS>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
