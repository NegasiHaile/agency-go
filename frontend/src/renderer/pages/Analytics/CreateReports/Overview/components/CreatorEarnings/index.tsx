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
import { Box, Typography, useTheme } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

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
  'AUG 1',
  'AUG 2',
  'AUG 3',
  'AUG 4',
  'AUG 5',
  'AUG 6',
  'AUG 7',
  'AUG 8',
  'AUG 9',
  'AUG 10',
  'AUG 11',
  'AUG 12',
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

export default function CreatorEarnings() {

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        backgroundColor: isDarkTheme ? '#000' : '#fff',
        padding: '20px',
        gap: '20px',
        borderRadius:'16px'
      }}
    >
      <Typography
        color={isDarkTheme ? '#fff' : '#000'}
        fontSize="22px"
        fontWeight={'600'}
        fontFamily={'Arimo'}
        display="flex"
        alignItems="center"
        gap="6px"
      >
        Creator Earnings
        <ErrorOutline
          sx={{ color: theme.palette.secondary.contrastText, fontSize: '24px' }}
        />
      </Typography>
      <Box
        sx={{
          height: '550px',
          width: '100%',
        }}
      >
        <Bar options={options} data={data} />
      </Box>
    </Box>
  );
}
