import Link from 'next/link'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const NotFoundClient = dynamic(() => import('@/components/NotFoundClient'), {
  ssr: false,
})

export default function NotFound() {
  return <NotFoundClient />
}
