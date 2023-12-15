import moment from 'moment';
import { ReactNode, createContext, useEffect, useState, useRef } from 'react';
import {
  CreateData,
  TimeLine,
} from 'renderer/pages/Accounting/Timekeeping/Types/index.types';

interface TimerContextType {
  setTimerActive: (data: any) => void;
  setBreakTimerActive: (data: any) => void;
  setBreakTime: (data: any) => void;
  setTime: (data: any) => void;
  setClockedIn: (data: any) => void;
  setOnBreak: (data: any) => void;
  setTimeline: (data: any) => void;
  setAttendanceData: (data: any) => void;
  time: number;
  breakTime: number;
  interval: any;
  breakInterval: any;
  isClockedIn: boolean;
  isOnBreak: boolean;
  timeline: TimeLine[];
  attandanceData: object;
  setBreaksArray: (data: any) => void;
  setCreateData: (data: any) => void;
  breaksArray: number[];
  createData: any;
}

export const TimerContext = createContext<TimerContextType>({
  setTimerActive: () => {},
  setBreakTimerActive: () => {},
  setBreakTime: () => {},
  setTime: () => {},
  setClockedIn: () => {},
  setOnBreak: () => {},
  setTimeline: () => {},
  setAttendanceData: () => {},
  setBreaksArray: () => {},
  setCreateData: () => {},
  time: 0,
  breakTime: 0,
  interval: null,
  breakInterval: null,
  isClockedIn: false,
  isOnBreak: false,
  timeline: [],
  attandanceData: {},
  breaksArray: [],
  createData: {},
});

interface $Props {
  children: ReactNode | ReactNode[];
}
export default function TimerProvider({ children }: $Props) {
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(0);
  const [breakTimerActive, setBreakTimerActive] = useState(false);

  const [isClockedIn, setClockedIn] = useState(false);
  const [isOnBreak, setOnBreak] = useState(false);

  const [timeline, setTimeline] = useState<TimeLine[]>([]);
  const [attandanceData, setAttendanceData] = useState({});

  const [breaksArray, setBreaksArray] = useState<number[]>([]);
  const [createData, setCreateData] = useState<CreateData>({
    startDateTime: moment(),
    endDateTime: moment(),
    notes: '',
    attendanceData: {},
  });

  const [breakTime, setBreakTime] = useState<number>(0);
  // let breakInterval: null | any = null;
  const interval = useRef<any>();
  const breakInterval = useRef<any>();

  // Clock in timer
  useEffect(() => {
    console.log('timerActive', timerActive);
    if (timerActive) {
      interval.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      // setStateFn(setCreateData, 'endDateTime', nowTime);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [timerActive]);

  // Break timer
  useEffect(() => {
    console.log('breakTimerActive', breakTimerActive);
    if (breakTimerActive) {
      breakInterval.current = setInterval(() => {
        setBreakTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      console.log('break interval end');
      clearInterval(breakInterval.current);
    }
    return () => clearInterval(breakInterval.current);
  }, [breakTimerActive]);

  return (
    <TimerContext.Provider
      value={{
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
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
