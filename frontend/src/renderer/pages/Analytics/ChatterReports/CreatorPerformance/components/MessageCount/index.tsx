import { ErrorOutline } from '@mui/icons-material';
import { Box, Divider, Typography, useTheme } from '@mui/material';
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

const labels = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Messages Sent',
      data: labels.map(() =>
        faker.datatype.number({ min: 0, max: 2000, precision: 0.01 })
      ),
      borderColor: '#8BFA9B',
      pointRadius: 5, 
      pointBackgroundColor: '#000', 
      pointBorderColor: '#8BFA9B', 
      pointBorderWidth:1.5, 
    },{
      label: 'PPVs Sent',
      data: labels.map(() =>
        faker.datatype.number({ min: 0, max: 2000, precision: 0.01 })
      ),
      borderColor: '#D9DCFD',
      pointRadius: 5, 
      pointBackgroundColor: '#000', 
      pointBorderColor: '#D9DCFD', 
      pointBorderWidth:1.5, 
    },{
      label: 'PPVs Unlocked',
      data: labels.map(() =>
        faker.datatype.number({ min: 0, max: 2000, precision: 0.01 })
      ),
      borderColor: '#6E1B4E',
      pointRadius: 5, 
      pointBackgroundColor: '#000', 
      pointBorderColor: '#6E1B4E', 
      pointBorderWidth:1.5, 
    },
  ],
};

export function MessageCountChart() {
  return <Line options={options} data={data} />;
}

const MessageCount = () => {
  const dummyData = [
    { color: '#8BFA9B', title: 'Messages Sent' },
    { color: '#D9DCFD', title: 'PPVs Sent' },
    { color: '#6E1B4E', title: 'PPVs Unlocked' },
  ];
const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        backgroundColor: isDarkTheme ? '#000' : '#fff',
        borderRadius: '16px',
        padding: '20px',
        gap: '20px',
      }}
    >
      <Typography
        color={isDarkTheme ? '#fff' : '#000'}
        fontSize="18px"
        display="flex"
        alignItems="center"
        gap="3px"
      >
        Message Count
        <ErrorOutline
          sx={{ color: theme.palette.secondary.contrastText, fontSize: '24px' }}
        />
      </Typography>
      <Box display={'flex'} gap={'20px'} marginTop={'20px'}>
        <Box sx={{ width: '75%', height: 300 }}>
          <MessageCountChart />
        </Box>
        <Box width={'25%'}>
          {dummyData.map((val) => {
            return (
              <>
                <Box display="flex" alignItems="center" padding="16px 0px">
                  <Box
                    marginRight={2}
                    width={10}
                    height={10}
                    borderRadius={'50%'}
                    bgcolor={val.color}
                  ></Box>
                  <Typography
                    width="150px"
                    fontSize={14}
                    color={isDarkTheme ? '#fff' : '#000'}
                  >
                    {val.title}
                  </Typography>
                </Box>
                <Divider />
              </>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageCount;
