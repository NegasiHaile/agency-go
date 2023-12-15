import { useContext, useEffect, useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import moment from 'moment';

import Attendance from './Attendance';
import Dashboard from '../../../components/Dashboard';
import AttendanceTrackTable from './AttendanceTrackTable';
import TimesheetReportsTable from './TimesheetReportsTable';
import { AuthContext } from 'renderer/contexts/AuthContext';

export default function Timekeeping() {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const { userData } = useContext(AuthContext);

  const [refresh, setRefresh] = useState('');

  // State Functions
  const toggleRefresh = () => {
    setRefresh(moment().toISOString());
  };
  const checkRole = () => {
    if (
      userData?.user?.role === 'manager' ||
      userData?.user?.role === 'admin'
    ) {
      return true;
    }
  };

  const shiftStart = 10 * 60 * 60; // 10am in seconds
  const shiftEnd = 19 * 60 * 60; // 7pm in seconds
  const shiftDuration = shiftEnd - shiftStart;

  return (
    <Dashboard>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box
          display="flex"
          gap="10px"
          padding="15px 10px 12px 10px"
          sx={{ background: isDarkTheme ? '#121212' : '#EAF1FF' }}
        >
          <Stack
            width={'30%'}
            sx={{ background: isDarkTheme ? '#121212' : '#EAF1FF' }}
          >
            <Attendance
              toggleRefresh={toggleRefresh}
              shiftDuration={shiftDuration}
            />
          </Stack>

          <Stack
            width={'70%'}
            sx={{ background: isDarkTheme ? '#121212' : '#EAF1FF' }}
          >
            <TimesheetReportsTable refresh={refresh} />
          </Stack>
        </Box>
        <Box>
          {checkRole() && (
            <Stack
              sx={{ bgcolor: isDarkTheme ? '#121212' : '#EAF1FF' }}
              padding="15px 10px 12px 10px"
              display={'block'}
            >
              <AttendanceTrackTable
                refresh={refresh}
                shiftDuration={shiftDuration}
              />
            </Stack>
          )}
        </Box>
      </div>
    </Dashboard>
  );
}
