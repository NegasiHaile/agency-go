import { ErrorOutline } from '@mui/icons-material';
import { Box, Checkbox, Divider, Typography, useTheme } from '@mui/material';
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

const labels = ['1',  '2',  '3',  '4',  '5',  '6',  '7',  '8',  '9',  '10',  '11',  '12',  '13',];

export const data = {
  labels,
  datasets: [
    {
      label: 'Earning Distribution',
      data: labels.map(() =>
        faker.datatype.number({ min: 0, max: 2000, precision: 0.01 })
      ),
      borderColor: '#2357BF',
      backgroundColor: '#2357BF',
      cubicInterpolationMode: 'monotone'
    },
  ],
};

export function EaringDistributionChart() {
  return <Line options={options} data={data} />;
}

const EaringDistribution = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const dummyData = [
    { name: 'admin@diamondlifestyle.com', dollar: '$1332.63' },
    { name: 'Peter', dollar: '$1096.00' },
    { name: 'Grace', dollar: '$783.63' },
    { name: 'Larry', dollar: '$223.63' },
    { name: 'Gomez', dollar: '$127.00' },
    { name: 'Karu', dollar: '$13.30' },
  ];
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
        fontFamily="Arimo"
        fontSize="20px"
        fontWeight="600"
        display="flex"
        alignItems="center"
        gap="10px"
      >
        Earing Distribution
        <ErrorOutline
          sx={{ color: theme.palette.secondary.contrastText, fontSize: '18px' }}
        />
      </Typography>
      <Box display={'flex'} gap={'20px'} marginTop={'20px'}>
        <Box sx={{ width: '70%', height: 400 }}>
          <EaringDistributionChart />
        </Box>
        <Box width={'30%'}>
          {dummyData.map((val) => {
            return (
              <>
                <Box display="flex" alignItems="center" padding="10px 0px">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                      color: '#2357BF',
                      '&.Mui-checked': {
                        color: '#2357BF',
                      },
                    }}
                  />
                  <Typography
                    width="200px"
                    fontSize={14}
                    color={isDarkTheme ? '#fff' : '#000'}
                  >
                    {val.name}
                  </Typography>
                  <Typography
                    width="50px"
                    fontSize={14}
                    color={isDarkTheme ? '#fff' : '#000'}
                  >
                    {val.dollar}
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

export default EaringDistribution;
