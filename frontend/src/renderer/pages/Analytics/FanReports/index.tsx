import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';



import theme from 'renderer/styles/muiTheme';
import DatePickerSvg from 'renderer/assets/svg/DatePickerSvg';
import Calendar from 'renderer/components/DateRangePicker';
import moment from 'moment';
import ButtonGroup from 'renderer/components/ButtonGroup';
import { EaringDistribution } from './EarningDistribution';

import AutoRenewTrend from './AutoRenewTrend';
import TrafficSource from './TrafficSource';
import FanRetenrion from './FanRetention';
import TopFans from './TopFans';
import { fontGrid } from '@mui/material/styles/cssUtils';




const timeButton = [
  { id: 1, title: 'Hour', link: '' },
  { id: 2, title: 'Days', link: '' },
  { id: 3, title: 'Weeks', link: '' },
  { id: 4, title: 'Months', link: '' },
];

function FanReports() {
  let date = new Date();
  let today = moment(date).format('yyyy-MM-DD');
  const [activeButton, setActiveButton] = useState(1);
  const [activeTime, setActiveTime] = useState(1);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const onChange = (ranges: any) => {
    setStartDate(moment(ranges.startDate).format('yyyy-MM-DD'));
    setEndDate(moment(ranges.endDate).format('yyyy-MM-DD'));
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Box
      sx={{ padding: '16px ' }}
      gap="8px"
      display="flex"
      flexDirection="column"
    >
      <Stack
        display="flex"
        direction="row"
        justifyContent={'flex-end'}
        alignItems={'center'}
        gap="10px"
        sx={{
          borderRadius: '16px',
          padding: '15px',
          background: isDarkTheme ? '#000' : '#fff',
        }}
      >
        <Box display="flex" gap="10px" alignItems="center">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="5px"
            border="2px solid "
            borderColor="primary.contrastText"
            padding="2px 8px"
            borderRadius="4px"
            onClick={() => setOpen(!open)}
          >
            <Typography
              fontSize={'11px'}
              fontWeight={500}
              color={isDarkTheme ? '#fff' : '#000'}
            >
              {' '}
              {startDate}{' '}
            </Typography>
            <Typography
              fontSize={'11px'}
              fontWeight={500}
              color={isDarkTheme ? '#fff' : '#000'}
            >
              {' '}
              to{' '}
            </Typography>
            <Typography
              fontSize={'11px'}
              fontWeight={500}
              color={isDarkTheme ? '#fff' : '#000'}
            >
              {endDate}
            </Typography>
            <DatePickerSvg />
          </Box>
        </Box>
        <ButtonGroup
          tabButton={timeButton}
          activeButton={activeTime}
          setActiveButton={setActiveTime}
        />
        <Select
          id="offer-expiration"
          value={'Gross Earnings'}
          onChange={() => {}}
          sx={{
            color: theme.palette.secondary.contrastText,
            width: 'fit-content',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.contrastText,
            },
            height: 'fit-content',
            padding: '0px 0px',
            ' & .MuiOutlinedInput-input': {
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
          <MenuItem value={'Gross Earnings'} sx={{ fontWeight: 500 }}>
            Gross Earnings
          </MenuItem>
        </Select>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {open && <Calendar onChange={onChange} open={open} setOpen={setOpen} />}
      </Box>
      <Box display="flex" flexDirection="column" gap="16px">
        <EaringDistribution />

        <AutoRenewTrend />
        <TrafficSource />
        <FanRetenrion />
        <TopFans />
      </Box>
    </Box>
  );
}

export default FanReports;
