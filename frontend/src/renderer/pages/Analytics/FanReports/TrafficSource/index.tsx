import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import faker from 'faker';
import theme from 'renderer/styles/muiTheme';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import ButtonGroup from 'renderer/components/ButtonGroup';
import { useState } from 'react';
import { ErrorOutline } from '@mui/icons-material';

const tabButtonData = [
  { id: 1, title: 'All', value: 'all' },
  { id: 2, title: 'Subscriptions', value: 'subscriptions' },
  { id: 3, title: 'Tips', value: 'tips' },
  { id: 4, title: 'Posts', value: 'posts' },
  { id: 5, title: 'Messages', value: 'messages' },
  { id: 6, title: 'Referrals', value: 'referrals' },
  { id: 7, title: 'Streams', value: 'streams' },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: '',
    },
  },
};

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apirl',
  'may',
  'Jun',
  'Jul',
  'Aug',
  'sept',
  'Oct',
  'Nov',
  'Dec',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 800 })),
      backgroundColor: '#5222DB',
    },
  ],
};

export default function TrafficSource() {
  const [activeButton, setActiveButton] = useState(1);
   const theme = useTheme();
   const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        background: isDarkTheme ? '#000' : '#fff',
        maxHeight: '700px',
        borderRadius: '16px',
        padding: '16px',
        gap: '30px',
      }}
    >
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          color={isDarkTheme ? '#fff' : '#000'}
          fontFamily="Arimo"
          fontSize="20px"
          fontWeight="600"
          display="flex"
          alignItems="center"
          gap="10px"
        >
          Traffic Source
          <ErrorOutline sx={{ color: theme.palette.secondary.contrastText,fontSize:'18px' }} />
        </Typography>
        
      </Stack>
      <Bar options={options} data={data} />
    </Box>
  );
}
