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
    priority: 'Medium' as Assignment['priority'],
    status: 'Not Started' as Assignment['status'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newAssignment);
    setNewAssignment({
      title: '',
      subject: '',
      dueDate: '',
      priority: 'Medium',
      status: 'Not Started',
    });
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add New Assignment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
                  />
                </FormControl>

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
                  />
                </FormControl>

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
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Add Assignment
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
