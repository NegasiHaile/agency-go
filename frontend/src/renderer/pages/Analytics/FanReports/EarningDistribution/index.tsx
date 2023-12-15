import React, { useRef, useEffect, useState } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import faker from 'faker';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import theme from 'renderer/styles/muiTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'purple',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 4',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 5',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 6',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 7',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 8',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      label: 'Dataset 9',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
  ],
};

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = faker.random.arrayElement(colors);
  const colorMid = faker.random.arrayElement(
    colors.filter((color) => color !== colorStart)
  );
  const colorEnd = faker.random.arrayElement(
    colors.filter((color) => color !== colorStart && color !== colorMid)
  );

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

export function EaringDistribution() {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);

  const dummyData = [
    {
      color: '#04A1FF',
      title: 'Subscriptions',
      percentage: 5.57,
      dollar: '$1332.63',
    },
    { color: '#04A1FF', title: 'Tips', percentage: -8, dollar: '$13' },
    { color: '#37DE8F', title: 'Posts', percentage: 5, dollar: '$332.63' },
    {
      color: '#750BB7',
      title: 'Messages',
      percentage: -10.5,
      dollar: '$223.63',
    },
    { color: '#F3C43E', title: 'Referrals', percentage: 0, dollar: '0 ' },
    { color: '#E0218A', title: 'Streams', percentage: -4.1, dollar: '$133 ' },
  ];

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Box
      borderRadius="16px"
      bgcolor={isDarkTheme ? '#000' : '#fff'}
      padding="20px"
      display="flex"
      flexDirection="column"
      gap="20px"
    >
      <Typography
        fontSize="22px"
        fontWeight={'600'}
        fontFamily={'Arimo'}
        display="flex"
        alignItems="center"
        gap="6px"
        color={isDarkTheme ? '#fff' : '#000'}
      >
        Subscribers
        <ErrorOutline
          sx={{ color: theme.palette.secondary.contrastText, fontSize: '18px' }}
        />
      </Typography>
      <Box display="flex">
        <Box width={'70%'}>
          <Chart ref={chartRef} type="line" data={chartData} />
        </Box>
        <Stack width={'350px'}>
          {dummyData.map((val) => {
            return (
              <>
                <Box display="flex" alignItems="center" padding="20px 0px">
                  <Box
                    marginRight={2}
                    width={10}
                    height={10}
                    borderRadius={'50%'}
                    bgcolor={val.color}
                  ></Box>
                  <Typography
                    width="150px"
                    color={isDarkTheme ? '#fff' : '#000'}
                  >
                    {val.title}
                  </Typography>
                  <Typography
                    width="100px"
                    color={Number(val.percentage) > 0 ? '#37DE8F' : '#FF0000'}
                  >
                    {val.percentage}%
                  </Typography>
                  <Typography
                    width="100px"
                    color={isDarkTheme ? '#fff' : '#000'}
                  >
                    {' '}
                    {val.dollar}
                  </Typography>
                </Box>
                <Divider />
              </>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
