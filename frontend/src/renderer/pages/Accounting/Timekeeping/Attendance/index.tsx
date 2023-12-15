import React, { useState, useEffect, useContext } from 'react';
import './style.css'; // Make sure you have an Attendance.css file
import { Box, Button, Typography, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';

import { TimerContext } from 'renderer/contexts/TimerContext';
import {
  createAttendance,
  getAttendanceById,
  updateAttendance,
  updateNotes,
} from 'services/attendance';
import { $props, CreateData, TimeLine } from '../Types/index.types';
import ProgressBar from '../Timebar';
import { createTimeline } from 'services/timeline';

// Attendance Component
const Attendance = ({ toggleRefresh, shiftDuration }: $props) => {
  const {
    setTimerActive,
    time,
    setBreakTimerActive,
    breakTime,
    setTime,
    setBreakTime,
    interval,
    breakInterval,
    isClockedIn,
    setClockedIn,
    isOnBreak,
    setOnBreak,
    timeline,
    setTimeline,
    attandanceData,
    setAttendanceData,
    breaksArray,
    setBreaksArray,
    createData,
    setCreateData,
  } = useContext(TimerContext);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  // State Functions
  const setStateFn = (setState: Function, key: string, value: any) => {
    setState((prevState: any) => {
      return { ...prevState, [key]: value };
    });
  };

  useEffect(() => {
    if (time > 0) {
      setClockedIn(true);
      if (time === shiftDuration) {
        updateAttendanceData({});
        clearInterval(interval);
      }
    }
  }, [time]);

  const saveBreaks = () => {
    if (breaksArray.length === 0) {
      setBreaksArray([...breaksArray, breakTime]);
    } else {
      setBreaksArray([
        ...breaksArray,
        breakTime - breaksArray[breaksArray.length - 1],
      ]);
    }
  };

  const clockIn = () => {
    setClockedIn(true);
    setTimerActive(true);
    createAttendanceData();
    setStateFn(
      setCreateData,
      'startDateTime',
      moment().format('YYYY-MM-DD HH:mm:ss')
    );
    toggleRefresh();
    setTimeline([
      ...timeline,
      {
        startTime: new Date(),
        type: 'working',
        endTime: null,
      },
    ]);
  };

  const clockOut = async () => {
    setClockedIn(false);
    setTimerActive(false);
    saveBreaks();
    timeline[timeline.length - 1].endTime = new Date();
    setTimeline([...timeline]);
    await updateAttendanceData({ timeline, clockedOut: true });
    toggleRefresh();
    const payload = {
      attendanceId: createData.attendanceData._id,
      ...timeline[timeline.length - 1],
    };
    await saveTimeline(payload);
    setStateFn(setCreateData, 'notes', '');
    setAttendanceData({});
    setTime(0);
    setBreakTime(0);
    setTimeline([]);
  };

  const startBreak = () => {
    setOnBreak(true);
    setTimerActive(false);
    setBreakTimerActive(true);
    timeline[timeline.length - 1].endTime = new Date();
    let newTimeLine: TimeLine = {
      startTime: new Date(),
      type: 'break',
      endTime: null,
    };
    setTimeline([...timeline, newTimeLine]);

    const payload = {
      attendanceId: createData.attendanceData._id,
      ...timeline[timeline.length - 1],
    };
    saveTimeline(payload);
  };

  const endBreak = async () => {
    setOnBreak(false);
    setTimerActive(true);
    setBreakTimerActive(false);
    saveBreaks();
    timeline[timeline.length - 1].endTime = new Date();
    setTimeline([
      ...timeline,
      {
        startTime: new Date(),
        type: 'working',
        endTime: null,
      },
    ]);

    const payload = {
      attendanceId: createData.attendanceData._id,
      ...timeline[timeline.length - 1],
    };
    await saveTimeline(payload);

    await updateAttendanceData({ timeline });
    getByID();
  };

  // Convert seconds into hours, minutes, and seconds
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const createAttendanceData = async () => {
    const payload = {
      startDateTime: createData.startDateTime,
      breakTime: breaksArray,
      notes: createData.notes,
      totalHours: time,
      breakHours: breakTime,
      timeLine: timeline,
    };
    try {
      const response = await createAttendance(payload);
      if (response.ack === 1) {
        setStateFn(setCreateData, 'attendanceData', response.data.data);
      }
    } catch (error) {}
  };
  const updateAttendanceData = async ({
    timeline,
    clockedOut = false,
  }: {
    timeline?: TimeLine[];
    clockedOut?: boolean;
  }) => {
    const payload = {
      startDateTime: moment(createData.startDateTime).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      endDateTime: moment(createData.endDateTime).isValid()
        ? moment(createData.endDateTime).format('YYYY-MM-DD HH:mm:ss')
        : null,
      ...(timeline &&
        timeline.length > 0 && {
          breakTime: timeline
            .filter((e) => e.type === 'break')
            .map((e) => ({ startTime: e.startTime, endTime: e.endTime })),
        }),
      totalHours: time,
      breakHours: breakTime,
      timeLine: timeline,
      isClockedOut: clockedOut,
    };
    try {
      await updateAttendance(payload, createData.attendanceData._id);
    } catch (error) {}
  };

  const updateNotesData = async () => {
    try {
      const payload = {
        notes: createData.notes,
      };
      const response = await updateNotes(
        payload,
        createData.attendanceData._id
      );
      if (response.ack === 1) {
        toggleRefresh();
        getByID();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  const saveNotes = () => {
    updateNotesData();
  };

  const saveTimeline = async (payload) => {
    try {
      await createTimeline(payload);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const checkBreakTime = (time) => {
    try {
      let minCount = time / 60;
      if (time > 59) {
        return <span>{(Math.abs(time) / 60).toFixed(2)} min</span>;
      } else if (minCount >= 60) {
        return <span>{(Math.abs(minCount) / 60).toFixed(2)} hr</span>;
      } else {
        return <span>{time}sec</span>;
      }
    } catch (error) {
      return <span></span>;
    }
  };

  const getByID = async () => {
    try {
      const response = await getAttendanceById(createData.attendanceData._id);

      if (response.ack === 1) {
        setAttendanceData(response.data[0]);
      }
    } catch (err) {}
  };

  return (
    <Box className="attendance-container">
      <div className="attendance-header">Attendance</div>
      <div className="attendence-layout">
        {!isClockedIn && (
          <div className="clock-in">
            <Button
              variant="contained"
              color="success"
              onClick={clockIn}
              startIcon={
                <AccessTimeIcon
                  sx={{ color: '#fff', marginTop: 0, fontSize: '14px' }}
                />
              }
            >
              <Typography
                style={{
                  textTransform: 'none',
                  color: '#fff',
                  fontSize: '14px',
                }}
              >
                Clock In
              </Typography>
            </Button>
          </div>
        )}
        {isClockedIn && !isOnBreak && (
          <>
            <div className="clock-out-btn-container">
              <Button
                variant="contained"
                color="error"
                onClick={clockOut}
                startIcon={
                  <AccessTimeIcon
                    sx={{ color: '#fff', marginTop: 0, fontSize: '14px' }}
                  />
                }
              >
                <Typography
                  style={{
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                >
                  Clock Out
                </Typography>
              </Button>
              <button className="start-break" onClick={startBreak}>
                Start Break
              </button>
            </div>
          </>
        )}
        {isOnBreak && (
          <div className="end-break-container">
            <button className="end-break" onClick={endBreak}>
              End Break
            </button>
          </div>
        )}
        <div className="add-notes" style={{ padding: 5 }}>
          <input
            type="text"
            placeholder="Add time sheet notes"
            style={{ fontSize: 12 }}
            value={createData.notes}
            onChange={(e) => setStateFn(setCreateData, 'notes', e.target.value)}
          />
          <button className="add-note" onClick={saveNotes}>
            Add note
          </button>
        </div>
        <Box>
          <div style={{ fontSize: 12 }}>
            Notes: {attandanceData && attandanceData.notes}
          </div>
          <div style={{ fontSize: 12 }}>
            Breaks:{' '}
            {attandanceData?.timeline && attandanceData.timeline.length > 0 ? (
              attandanceData.timeline
                .filter((e) => e.type === 'break')
                .map((e, i) => {
                  return <span key={i}>{checkBreakTime(e.total)}{i < attandanceData.timeline.filter((e) => e.type === 'break').length - 1 ? ',' : ''} </span>;
                })
            ) : (
              <></>
            )}
          </div>
        </Box>
        {isOnBreak ? (
          <div className="timer">{formatTime(breakTime)} Hrs</div>
        ) : (
          <div className="timer">{formatTime(time)} Hrs</div>
        )}

        <div className="date">17 Oct 2023</div>
        <div className="checked-in-msg">early by 6am</div>
        <div className="shift-txt">Shift</div>
        <ProgressBar timeline={timeline} shiftDuration={shiftDuration} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: 12,
          }}
        >
          <span>10am</span>
          <span>7pm</span>
        </div>
      </div>
    </Box>
  );
};

export default Attendance;
