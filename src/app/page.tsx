'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Heading,
  VStack,
  Grid,
  useColorModeValue,
  Spinner,
  Center,
  Button,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import AssignmentList from '@/components/AssignmentList';
import AssignmentStats from '@/components/AssignmentStats';
import AssignmentChart from '@/components/AssignmentChart';
import AddAssignment from '@/components/AddAssignment';

export type Assignment = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  dueTime?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Not Started' | 'In Progress' | 'Completed';
};

export default function Home() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const checkAuth = async () => {
        try {
          // Try to fetch user data or validate session
          const response = await fetch('/api/auth/validate');
          if (!response.ok) {
            router.replace('/auth');
          } else {
            // Get user email from cookie
            const cookies = document.cookie.split(';');
            const userEmailCookie = cookies.find(cookie => cookie.trim().startsWith('user_email='));
            if (userEmailCookie) {
              const email = decodeURIComponent(userEmailCookie.split('=')[1]);
              setUserEmail(email);
            }
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Auth check error:', error);
          router.replace('/auth');
        }
      };

      checkAuth();
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: 'Logged out successfully',
          status: 'success',
          duration: 3000,
        });
        router.replace('/auth');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const addAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newAssignment = {
      ...assignment,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAssignments([...assignments, newAssignment]);
  };

  const updateAssignment = (updatedAssignment: Assignment) => {
    setAssignments(assignments.map(a => 
      a.id === updatedAssignment.id ? updatedAssignment : a
    ));
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg={bgColor} py={8}>
        <Center h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <HStack w="full" justify="space-between" align="center">
            <VStack align="flex-start" spacing={1}>
              <Heading size="lg">Assignment Dashboard</Heading>
              {userEmail && (
                <Text color="gray.600">
                  Welcome, {userEmail}
                </Text>
              )}
            </VStack>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </HStack>
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
            gap={8}
            w="full"
          >
            <VStack spacing={8} alignItems="stretch">
              <AddAssignment onAdd={addAssignment} />
              <AssignmentList
                assignments={assignments}
                onUpdate={updateAssignment}
                onDelete={deleteAssignment}
              />
            </VStack>
            <VStack spacing={8} alignItems="stretch">
              <AssignmentStats assignments={assignments} />
              <AssignmentChart assignments={assignments} />
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
