import { Box, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import Overview from './Overview';
import ButtonGroup from 'renderer/components/ButtonGroup';
import theme from 'renderer/styles/muiTheme';
import DatePickerSvg from 'renderer/assets/svg/DatePickerSvg';
import Calendar from 'renderer/components/DateRangePicker';
import moment from 'moment';
import CreatorPerformance from './CreatorPerformance';

const pageButton = [
  { id: 1, title: 'Overview', component: <Overview /> },
  { id: 2, title: 'Creator Performance', component: <CreatorPerformance /> },
];

function ChatterReports() {
  let date = new Date();
  let today = moment(date).format('yyyy-MM-DD');
  const [activeButton, setActiveButton] = useState(1);
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
      sx={{ padding: '10px ' }}
      gap="10px"
      display="flex"
      flexDirection="column"
    >
      <Stack
        display="flex"
        direction="row"
        justifyContent="space-between"
        sx={{
          borderRadius: '16px',
          padding: '15px',
          background: isDarkTheme ? '#000' : '#fff',
        }}
      >
        <ButtonGroup
          tabButton={pageButton}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
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
          <Select
            id="offer-expiration"
            value={'All Creators'}
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
            <MenuItem value={'All Creators'} sx={{ fontWeight: 500 }}>
              All Creators
            </MenuItem>
          </Select>
        </Box>
      </Stack>
      {activeButton === 1 ? <Overview /> : <CreatorPerformance />}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {open && <Calendar onChange={onChange} open={open} setOpen={setOpen} />}
      </Box>
    </Box>
  );
}

export default ChatterReports;
