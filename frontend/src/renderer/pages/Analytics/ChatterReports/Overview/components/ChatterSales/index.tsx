import { ErrorOutline } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import theme from 'renderer/styles/muiTheme';
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
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true,
        borderColor: 'rgba(0, 0, 255, 0.1) !important',
        borderWidth: '1px !important', 
      },
    },
    y: {
      beginAtZero: true,
      max: 1,
      min: 0,
      ticks: {
        stepSize: 0.25,
        callback: function (value: any) {
          return value.toFixed(2);
        },
      },
      grid: {
        display: true,
        borderColor: 'rgba(0, 0, 255, 0.1) !important',
        borderWidth: '1px !important', 
      },
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Chatter Sales',
      data: labels.map(() =>
        faker.datatype.number({ min: 0, max: 1, precision: 0.01 })
      ),
      borderColor: '#2357BF',
      backgroundColor: '#2357BF',
    },
  ],
};

export function ChatterSalesChart() {
  return (
    <Line options={options} data={data} />
  );
}

const ChatterSales = () => {
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
        fontSize="18px"
        fontFamily={'Arimo'}

        fontWeight={'600'}
        display="flex"
        alignItems="center"
        gap="6px"
      >
        Chatter Sales
        <ErrorOutline
          sx={{ color: theme.palette.secondary.contrastText, fontSize: '18px' }}
        />
      </Typography>
      <Box sx={{ height: '600px', width: '100%' }}>
        <ChatterSalesChart />
      </Box>
    </Box>
  );
};

export default ChatterSales;
