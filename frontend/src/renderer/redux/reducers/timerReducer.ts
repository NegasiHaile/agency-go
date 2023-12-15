import {
  SET_TOTAL_WORK_TIME,
  SET_TOTAL_BREAK_TIME,
  IS_CLOCK_OUT,
  IS_CLOCKED_IN,
  SET_TIMER_ACTIVE,
  IS_ON_BREAK,
  SET_BREAK_TIMER_ACTIVE,
} from '../actionTypes';

interface TimerState {
  workTime: number;
  breakTime: number;
  isClockedIn: boolean;
  isOnBreak: boolean;
  timerActive: boolean;
  breakTimerActive: boolean;
}

const initialState: TimerState = {
  workTime: 0,
  breakTime: 0,
  isClockedIn: false,
  isOnBreak: false,
  timerActive: false,
  breakTimerActive: false,
};

const timerReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOTAL_WORK_TIME:
      return { ...state, workTime: state.workTime + 1 };
    case SET_TOTAL_BREAK_TIME:
      return { ...state, breakTime: state.breakTime + 1 };
    case IS_CLOCK_OUT:
      return { ...state, workTime: 0, breakTime: 0 };
    case IS_CLOCKED_IN:
      return { ...state, isClockedIn: payload };
    case SET_TIMER_ACTIVE:
      return { ...state, timerActive: payload };
    case IS_ON_BREAK:
      return { ...state, isOnBreak: payload };
    case SET_BREAK_TIMER_ACTIVE:
      return { ...state, breakTimerActive: payload };
    default:
      return state;
  }
};

export default timerReducer;
