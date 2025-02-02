'use client';

import {
  SimpleGrid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';
import { Assignment } from '@/app/page';

interface AssignmentStatsProps {
  assignments: Assignment[];
}

export default function AssignmentStats({ assignments }: AssignmentStatsProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter(
    (a) => a.status === 'Completed'
  ).length;
  const inProgressAssignments = assignments.filter(
    (a) => a.status === 'In Progress'
  ).length;
  const highPriorityAssignments = assignments.filter(
    (a) => a.priority === 'High'
  ).length;

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
      <Stat
        px={4}
        py={3}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <StatLabel>Total</StatLabel>
        <StatNumber>{totalAssignments}</StatNumber>
        <StatHelpText>Assignments</StatHelpText>
      </Stat>

      <Stat
        px={4}
        py={3}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <StatLabel>Completed</StatLabel>
        <StatNumber>{completedAssignments}</StatNumber>
        <StatHelpText>Tasks</StatHelpText>
      </Stat>

      <Stat
        px={4}
        py={3}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <StatLabel>In Progress</StatLabel>
        <StatNumber>{inProgressAssignments}</StatNumber>
        <StatHelpText>Tasks</StatHelpText>
      </Stat>

      <Stat
        px={4}
        py={3}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <StatLabel>High Priority</StatLabel>
        <StatNumber>{highPriorityAssignments}</StatNumber>
        <StatHelpText>Tasks</StatHelpText>
      </Stat>
    </SimpleGrid>
  );
}
