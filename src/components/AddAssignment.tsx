'use client';

import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Assignment } from '@/app/page';

interface AddAssignmentProps {
  onAdd: (assignment: Omit<Assignment, 'id'>) => void;
}

export default function AddAssignment({ onAdd }: AddAssignmentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    dueDate: '',
    dueTime: '23:59',
    priority: 'Medium' as Assignment['priority'],
    status: 'Not Started' as Assignment['status'],
  });

  const modalBg = useColorModeValue('white', 'gray.800');
  const inputBg = useColorModeValue('white', 'gray.700');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedDueDate = `${newAssignment.dueDate}T${newAssignment.dueTime}`;
    onAdd({
      ...newAssignment,
      dueDate: combinedDueDate,
    });
    setNewAssignment({
      title: '',
      subject: '',
      dueDate: '',
      dueTime: '23:59',
      priority: 'Medium',
      status: 'Not Started',
    });
    onClose();
  };

  return (
    <>
      <Button 
        colorScheme="blue" 
        onClick={onOpen}
        size="lg"
        w="full"
        bgGradient="linear(to-r, blue.400, purple.500)"
        _hover={{
          bgGradient: "linear(to-r, blue.500, purple.600)",
        }}
      >
        Add New Assignment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent bg={modalBg}>
          <ModalHeader>Add New Assignment</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={newAssignment.title}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, title: e.target.value })
                    }
                    bg={inputBg}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    value={newAssignment.subject}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        subject: e.target.value,
                      })
                    }
                    bg={inputBg}
                  />
                </FormControl>

                <HStack w="full" spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Due Date</FormLabel>
                    <Input
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          dueDate: e.target.value,
                        })
                      }
                      bg={inputBg}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Time</FormLabel>
                    <Input
                      type="time"
                      value={newAssignment.dueTime}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          dueTime: e.target.value,
                        })
                      }
                      bg={inputBg}
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    value={newAssignment.priority}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        priority: e.target.value as Assignment['priority'],
                      })
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
                    value={newAssignment.status}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        status: e.target.value as Assignment['status'],
                      })
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
                Add Assignment
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
