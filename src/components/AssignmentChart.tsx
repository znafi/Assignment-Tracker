'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { Assignment } from '@/app/page';

interface AssignmentChartProps {
  assignments: Assignment[];
}

export default function AssignmentChart({ assignments }: AssignmentChartProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const statusData = [
    {
      name: 'Completed',
      value: assignments.filter((a) => a.status === 'Completed').length,
    },
    {
      name: 'In Progress',
      value: assignments.filter((a) => a.status === 'In Progress').length,
    },
    {
      name: 'Not Started',
      value: assignments.filter((a) => a.status === 'Not Started').length,
    },
  ].filter((item) => item.value > 0);

  const COLORS = ['#48BB78', '#ECC94B', '#F56565'];

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      height="300px"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {statusData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
