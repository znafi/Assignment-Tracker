'use client';

import { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Assignment } from '@/app/page';
import { formatDistanceToNow, isPast, parseISO, format } from 'date-fns';

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
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedAssignment, setEditedAssignment] = useState<Assignment | null>(
    null
  );

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const modalBg = useColorModeValue('white', 'gray.800');
  const inputBg = useColorModeValue('white', 'gray.700');

  const handleEdit = (assignment: Assignment) => {
    const [date, time] = assignment.dueDate.split('T');
    setEditedAssignment({
      ...assignment,
      dueDate: date,
      dueTime: time || '23:59',
    });
    onOpen();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedAssignment) {
      const updatedAssignment = {
        ...editedAssignment,
        dueDate: `${editedAssignment.dueDate}T${editedAssignment.dueTime || '23:59'}`,
      };
      onUpdate(updatedAssignment);
      onClose();
    }
  };

  const getTimeRemaining = (dueDate: string) => {
    const date = parseISO(dueDate);
    if (isPast(date)) {
      return <Badge colorScheme="red">Overdue</Badge>;
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getPriorityColor = (priority: Assignment['priority']) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'In Progress':
        return 'blue';
      case 'Not Started':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      {assignments.map((assignment) => (
        <Box
          key={assignment.id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          bg={cardBg}
          borderColor={borderColor}
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
        >
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={2} flex={1}>
              <Text fontSize="lg" fontWeight="bold">
                {assignment.title}
              </Text>
              <Text color="gray.500">{assignment.subject}</Text>
              <HStack spacing={2}>
                <Badge colorScheme={getPriorityColor(assignment.priority)}>
                  {assignment.priority}
                </Badge>
                <Badge colorScheme={getStatusColor(assignment.status)}>
                  {assignment.status}
                </Badge>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                Due: {format(parseISO(assignment.dueDate), 'PPpp')}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                Time remaining: {getTimeRemaining(assignment.dueDate)}
              </Text>
            </VStack>
            <HStack>
              <IconButton
                icon={<FaEdit />}
                aria-label="Edit"
                colorScheme="blue"
                variant="ghost"
                onClick={() => handleEdit(assignment)}
              />
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete"
                colorScheme="red"
                variant="ghost"
                onClick={() => onDelete(assignment.id)}
              />
            </HStack>
          </HStack>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent bg={modalBg}>
          <ModalHeader>Edit Assignment</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={editedAssignment?.title || ''}
                    onChange={(e) =>
                      setEditedAssignment(
                        editedAssignment
                          ? { ...editedAssignment, title: e.target.value }
                          : null
                      )
                    }
                    bg={inputBg}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    value={editedAssignment?.subject || ''}
                    onChange={(e) =>
                      setEditedAssignment(
                        editedAssignment
                          ? { ...editedAssignment, subject: e.target.value }
                          : null
                      )
                    }
                    bg={inputBg}
                  />
                </FormControl>

                <HStack w="full" spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Due Date</FormLabel>
                    <Input
                      type="date"
                      value={editedAssignment?.dueDate || ''}
                      onChange={(e) =>
                        setEditedAssignment(
                          editedAssignment
                            ? { ...editedAssignment, dueDate: e.target.value }
                            : null
                        )
                      }
                      bg={inputBg}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Time</FormLabel>
                    <Input
                      type="time"
                      value={editedAssignment?.dueTime || '23:59'}
                      onChange={(e) =>
                        setEditedAssignment(
                          editedAssignment
                            ? { ...editedAssignment, dueTime: e.target.value }
                            : null
                        )
                      }
                      bg={inputBg}
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    value={editedAssignment?.priority || 'Medium'}
                    onChange={(e) =>
                      setEditedAssignment(
                        editedAssignment
                          ? {
                              ...editedAssignment,
                              priority: e.target.value as Assignment['priority'],
                            }
                          : null
                      )
                    }
                    bg={inputBg}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={editedAssignment?.status || 'Not Started'}
                    onChange={(e) =>
                      setEditedAssignment(
                        editedAssignment
                          ? {
                              ...editedAssignment,
                              status: e.target.value as Assignment['status'],
                            }
                          : null
                      )
                    }
                    bg={inputBg}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="blue" 
                type="submit"
                bgGradient="linear(to-r, blue.400, purple.500)"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                }}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
