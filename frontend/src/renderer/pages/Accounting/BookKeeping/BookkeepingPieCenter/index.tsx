import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Divider, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import theme from 'renderer/styles/muiTheme';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [],
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

export function BookkeepingPieCenter() {
  const [selectedStatus, setSelectedStatus] = useState('Filter');

 const theme = useTheme();
 const isDarkTheme = theme.palette.mode === 'dark';


  return (
    <Box
      borderRadius="16px"
      bgcolor={isDarkTheme ? '#0C0C0C' : '#fff'}
      padding="20px"
      display="flex"
      flexDirection="column"
      gap="20px"
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
        display="flex"
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box width={'30%'}>
          <Doughnut data={data} />
        </Box>
        <Stack width={'50%'}>
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
                  <Typography width="354px">{val.title}</Typography>

                  <Typography width="354px">{val.dollar}</Typography>
                </Box>
                <Divider sx={{ bgcolor: '#292929' }} />
              </>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
