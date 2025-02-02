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
  priority: 'Low' | 'Medium' | 'High';
  status: 'Not Started' | 'In Progress' | 'Completed';
};

export default function Home() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

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

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center" color="blue.500">
            Assignment Dashboard
          </Heading>

          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={8}
          >
            <AssignmentStats assignments={assignments} />
            <AssignmentChart assignments={assignments} />
          </Grid>

          <AddAssignment onAdd={addAssignment} />
          
          <AssignmentList
            assignments={assignments}
            onUpdate={updateAssignment}
            onDelete={deleteAssignment}
          />
        </VStack>
      </Container>
    </Box>
  );
}
