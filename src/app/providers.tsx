'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
      variants: {
        solid: {
          bg: 'blue.500',
          color: 'white',
          _hover: {
            bg: 'blue.600',
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'gray.800',
        },
        header: {
          color: 'white',
        },
        body: {
          color: 'white',
        },
        footer: {
          color: 'white',
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: 'gray.800',
            borderColor: 'gray.600',
            color: 'white',
            _hover: {
              borderColor: 'gray.500',
            },
            _focus: {
              borderColor: 'blue.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: 'gray.800',
            borderColor: 'gray.600',
            color: 'white',
            _hover: {
              borderColor: 'gray.500',
            },
            _focus: {
              borderColor: 'blue.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'gray.200',
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
