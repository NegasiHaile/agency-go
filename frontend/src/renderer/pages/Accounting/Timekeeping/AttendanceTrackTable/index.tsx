import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import { useTheme } from '@emotion/react';

import ProgressBar from '../Timebar';
import { getEmpAttendance, getEmpAttendanceAll } from 'services/attendance';
import { $trackprops, AttendanceTimeSheet } from '../Types/index.types';
import TimesheetEditModal from '../EditModal';
import { AuthContext } from 'renderer/contexts/AuthContext';

const AttendanceTrackTable = ({ refresh, shiftDuration }: $trackprops) => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const { userData } = useContext(AuthContext);

  const [attedndanceTrackData, setAttendanceTrackData] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const checkRole = () => {
    if (
      userData?.user?.role === 'manager' ||
      userData?.user?.role === 'admin'
    ) {
      return true;
    }
  };

  const handleClose = (e: any) => {
    setEditData(e);
    setShowEdit(!showEdit);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };
  const getData = async () => {
    try {
      const response = await getEmpAttendanceAll();
      if (response.ack === 1) {
        setAttendanceTrackData(response.data);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  function truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
    }
    return str;
  }

  return (
    <div className="timesheet-container">
      <div className="timesheet-date-section-container">
        <div className="attendance-header mb-0">Attendance Track</div>
      </div>

      <TableContainer style={{ maxHeight: 420 }}>
        <Table
          className="timesheet-table"
          sx={{
            minWidth: 650,
            borderRadius: 16,
            border: '1px solid #292929',
          }}
          aria-label="simple table"
        >
          <TableHead sx={{ bgcolor: isDarkTheme ? '#292929' : '#EAF1FF' }}>
            <TableRow>
              <TableCell>Check-in</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Progress</TableCell>

              {/* {checkRole() && <TableCell>Edit Log</TableCell>} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {attedndanceTrackData &&
              attedndanceTrackData?.map((e: AttendanceTimeSheet, i) => {
                return (
                  <TableRow
                    key={i}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    sx={{
                      '& td, & th': {
                        borderTop: 0,
                        borderRight: 0,
                        borderLeft: 0,
                        borderColor: '#333',
                      },
                    }}
                  >
                    <TableCell sx={{ color: '#FFFFFF' }}>
                      {moment(e.startDateTime).format('dddd, DD, YYYY h:mma')}
                    </TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>
                      {e?.users?.[0]?.email}
                    </TableCell>

                    <TableCell sx={{ color: '#FFFFFF' }}>
                      {truncateString(e.notes, 30)}
                    </TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>
                      <ProgressBar
                        timeline={e.timeline || []}
                        shiftDuration={shiftDuration}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {
        <TimesheetEditModal
          showEdit={showEdit}
          handleClose={handleClose}
          editData={editData}
        />
      }
    </div>
  );
};

export default AttendanceTrackTable;
