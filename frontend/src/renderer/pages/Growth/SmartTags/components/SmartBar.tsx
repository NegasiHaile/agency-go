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
import { Box } from '@mui/material';

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

const labels = ['0', '1', '2', '3', '4', '5', '6'];

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

export default function SmartBar() {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        maxHeight: '200px',
        width: '100%',
      }}
    >
      <Bar options={options} data={data} />
    </Box>
  );
}
