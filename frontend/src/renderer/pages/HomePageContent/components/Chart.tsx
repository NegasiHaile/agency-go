import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import theme from 'renderer/styles/muiTheme';
import { Box, useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['0', '1', '2', '3', '4', '5', '6'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function ChartLine() {
  const theme = useTheme();
   const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{
        backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
        maxHeight: '200px',
        borderRadius: '16px',
      }}
    >
      <Line
        options={options}
        data={data}
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
}
