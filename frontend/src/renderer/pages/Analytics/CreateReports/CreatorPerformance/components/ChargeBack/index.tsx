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
import { Box, Typography, useTheme } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import theme from 'renderer/styles/muiTheme';

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
  },
};
const labels = ['0', '1', '2', '3', '4', '5', '6'];

const data = {
  labels: labels,
  datasets: [
    {
      data: [55, 59, 60, 55, 56, 55, 52],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

export default function ChargeBacks() {

     const theme = useTheme();
     const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <>
      <Box
        borderRadius="16px"
        padding="20px"
        bgcolor={isDarkTheme ? '#000' : '#fff'}
      >
        <Typography
          fontSize="22px"
          display="flex"
          alignItems="center"
          gap="3px"
          color={isDarkTheme ? '#fff' : '#000'}
        >
          Chargebacks
          <ErrorOutline
            sx={{
              color: theme.palette.secondary.contrastText,
              fontSize: '24px',
            }}
          />
        </Typography>

        <Box display="flex" flexDirection="column" gap="20px" maxHeight="300px">
          <Line
            options={options}
            data={data}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      </Box>
    </>
  );
}
