
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
import { Box, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: false,
//       text: '',
//     },
//   },
// };
export const options = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true,
        borderColor: 'white !important',
        borderWidth: '1px !important',
      },
    },
    y: {
      beginAtZero: true,
      max: 2000,
      min: 0,
      ticks: {
        stepSize: 500,
        callback: function (value: any) {
          return value;
        },
      },
      grid: {
        display: true,
        borderColor: 'white !important',
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


const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 5000 })),
      backgroundColor: '#44EA97',
    },
  ],
};

const chartSetting = {
  // xAxis: [
  //   {
  //     label: 'rainfall (mm)',
  //   },
  // ],
  width: 400,
  height: 200,

};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Fev',
  },

];

const valueFormatter = (value: number) => `${value}mm`;

export default function BookLeftInvoice() {
  const [selectedStatus, setSelectedStatus] = useState('Filter');

   const theme = useTheme();
   const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box
      display="flex"
      justifyContent={'space-between'}
      flexDirection={'column'}
      sx={{
        backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
       width:'500px',
        padding: '20px',
        gap: '20px',
        borderRadius:'16px'
      }}
    >
      <Box
        display="flex"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <Typography
            fontSize="22px"
            display="flex"
            alignItems="center"
            gap="3px"
          >
            Invoicing{' '}
            <ErrorOutline
              sx={{ color: theme.palette.secondary.contrastText }}
            />
          </Typography>
        </Box>
        <Box>
          <Typography
            fontSize="14px"
            display="flex"
            alignItems="center"
            gap="3px"
            color={'#04A1FF'}
          >
            Create an invoices
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: '450px',
          width: '100%',
        }}
      >
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[{ dataKey: 'seoul', valueFormatter }]}
          layout="horizontal"
          {...chartSetting}
        />
        {/* <Bar options={options} data={data} /> */}
      </Box>

      <Box display="flex" justifyContent={'space-evenly'} gap="16px"  bgcolor={isDarkTheme ? '#000' : '#fff'}>
        <Box display="flex" alignItems="center" gap="8px">
          <Box
            width={'12px'}
            height={'12px'}
            style={{ backgroundColor: '#E26626', borderRadius: '50%' }}
          ></Box>
          <Box>
            <Typography
              fontSize="14px"
              display="flex"
              alignItems="center"
              gap="3px"
            >
              Expenses
            </Typography>
            <Typography
              fontSize="22px"
              display="flex"
              alignItems="center"
              gap="3px"
            >
              $822
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box display="flex" alignItems="center" gap="8px">
            <Box
              width={'12px'}
              height={'12px'}
              style={{ backgroundColor: '#FF0000', borderRadius: '50%' }}
            ></Box>
            <Box>
              <Typography
                fontSize="14px"
                display="flex"
                alignItems="center"
                gap="3px"
              >
                Expenses
              </Typography>
              <Typography
                fontSize="22px"
                display="flex"
                alignItems="center"
                gap="3px"
              >
                $822
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
