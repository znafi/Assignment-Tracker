'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBgColor = useColorModeValue('white', 'gray.700');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        toast({
          title: isLogin ? 'Login successful!' : 'Account created!',
          status: 'success',
          duration: 3000,
        });
        router.push('/');
        router.refresh(); // Force a refresh to trigger the authentication check
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="lg" py={{ base: '12', md: '16' }} px={{ base: '0', sm: '8' }}>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={boxBgColor}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={{ base: 'xs', md: 'sm' }}>
                  {isLogin ? 'Log in to your account' : 'Create an account'}
                </Heading>
              </Stack>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormControl>
                </Stack>

                <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                  {isLogin ? 'Sign in' : 'Sign up'}
                </Button>

                <Stack spacing="6">
                  <Text textAlign="center">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <Button
                      variant="link"
                      colorScheme="blue"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? 'Sign up' : 'Log in'}
                    </Button>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
