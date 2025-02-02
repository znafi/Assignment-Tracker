'use client'

import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, blue.400, purple.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Button
        colorScheme="blue"
        bgGradient="linear(to-r, blue.400, purple.500)"
        color="white"
        variant="solid"
        onClick={() => router.push('/')}
      >
        Go to Home
      </Button>
    </Box>
  )
}
