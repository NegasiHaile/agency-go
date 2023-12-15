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

const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 2780,
];
const pData = [
  2400, 1398, 9800, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780, 2780,
];
const xLabels = [
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

export default function BookRightInvoice() {
  const [selectedStatus, setSelectedStatus] = useState('Filter');

const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';



  return (
    <Box
      sx={{
        backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
        
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
            Expenses{' '}
            <ErrorOutline
              sx={{ color: theme.palette.secondary.contrastText }}
            />
          </Typography>
          <Typography
            fontSize="34px"
            display="flex"
            alignItems="center"
            gap="3px"
          >
            $822
          </Typography>
        </Box>

        <Box>
          <Select
            id="filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{
              color: theme.palette.secondary.contrastText,
              width: 'fit-content',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.light,
              },
              height: 'fit-content',
              padding: '0px 0px',
              ' & .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
                {
                  padding: '4px 8px',
                },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
              '.MuiSvgIcon-root': {
                fill: 'white !important',
              },
              input: {
                backgroundColor: theme.palette.secondary.contrastText,
              },
            }}
          >
            <MenuItem
              value={'Filter'}
              sx={{ fontWeight: 500, fontSize: '11px' }}
            >
              Last 30 days
            </MenuItem>
            <MenuItem value={'paid'} sx={{ fontWeight: 500, fontSize: '11px' }}>
              Paid invoice
            </MenuItem>
            <MenuItem
              value={'unpaid'}
              sx={{ fontWeight: 500, fontSize: '11px' }}
            >
              Pending invoice
            </MenuItem>
          </Select>
        </Box>
      </Box>
      <Box
        sx={{
          height: '450px',
          width: '100%',
        }}
      >
        <BarChart
          series={[
            { data: pData, label: 'pv', id: 'pvId', stack: 'total' },
            { data: uData, label: 'uv', id: 'uvId', stack: 'total' },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
        />
        {/* <Bar options={options} data={data} /> */}
      </Box>

      <Box display="flex" justifyContent={'center'} gap="16px">
        <Box display="flex" alignItems="center" gap="8px">
          <Box
            width={'12px'}
            height={'12px'}
            style={{ backgroundColor: '#44EA97', borderRadius: '50%' }}
          ></Box>
          <Box>
            <Typography
              fontSize="14px"
              display="flex"
              alignItems="center"
              gap="3px"
            >
              Income
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
                $422
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
