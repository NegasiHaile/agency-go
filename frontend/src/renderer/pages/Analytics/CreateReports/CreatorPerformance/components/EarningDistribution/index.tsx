import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import theme from 'renderer/styles/muiTheme';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [4, 5, 5, 5, 5],
      backgroundColor: ['#F3C43E', '#E0218A', '#FA6304', '#00AFF0', '#37DE8F'],
      borderColor: 'none',
    },
  ],
};

const dummyData = [
  {
    color: '#04A1FF',
    title: 'Subscriptions',
    percentage: 5.57,
    dollar: '$1332.63',
  },
  { color: '#04A1FF', title: 'Tips', percentage: -5.57, dollar: '$13' },
  { color: '#37DE8F', title: 'Posts', percentage: '5%', dollar: '$332.63' },
  {
    color: '#750BB7',
    title: 'Messages',
    percentage: 10.5,
    dollar: '$223.63',
  },
  { color: '#F3C43E', title: 'Referrals', percentage: -0.0, dollar: '0 ' },
  { color: '#E0218A', title: 'Streams', percentage: 4.1, dollar: '$133 ' },
];

export function EaringDistribution() {

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
        display="flex"
        alignItems="center"
        gap="3px"
        color={isDarkTheme ? '#fff' : '#000'}
      >
        Earning Distribution
        <ErrorOutline
          sx={{ color: theme.palette.secondary.contrastText, fontSize: '24px' }}
        />
      </Typography>
      <Box display="flex">
        <Box width={'70%'}>
          <Doughnut data={data} />
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
