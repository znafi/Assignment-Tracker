'use client';

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { Assignment } from '@/app/page';
import { format } from 'date-fns';

interface AssignmentListProps {
  assignments: Assignment[];
  onUpdate: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
}

export default function AssignmentList({
  assignments,
  onUpdate,
  onDelete,
}: AssignmentListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'In Progress':
        return 'yellow';
      default:
        return 'red';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      default:
        return 'green';
    }
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Subject</Th>
            <Th>Due Date</Th>
            <Th>Priority</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assignments.map((assignment) => (
            <Tr key={assignment.id}>
              <Td>{assignment.title}</Td>
              <Td>{assignment.subject}</Td>
              <Td>{format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</Td>
              <Td>
                <Badge colorScheme={getPriorityColor(assignment.priority)}>
                  {assignment.priority}
                </Badge>
              </Td>
              <Td>
                <Select
                  value={assignment.status}
                  onChange={(e) =>
                    onUpdate({ ...assignment, status: e.target.value as Assignment['status'] })
                  }
                  size="sm"
                  width="140px"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Select>
              </Td>
              <Td>
                <IconButton
                  aria-label="Delete assignment"
                  icon={<FaTrash />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => onDelete(assignment.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
