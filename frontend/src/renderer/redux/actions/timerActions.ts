import {
  SET_TOTAL_WORK_TIME,
  SET_TOTAL_BREAK_TIME,
  IS_CLOCK_OUT,
  IS_CLOCKED_IN,
  SET_TIMER_ACTIVE,
  SET_BREAK_TIMER_ACTIVE,
} from '../actionTypes';

export const setTotalWorkTime = () => ({
  type: SET_TOTAL_WORK_TIME,
});

export const setTotalBreakTime = () => ({
  type: SET_TOTAL_BREAK_TIME,
});

export const setClockOut = () => ({
  type: IS_CLOCK_OUT,
});

export const setClockedIn = (payload) => ({
  type: IS_CLOCKED_IN,
  payload: payload,
});

export const setTimerActive = (payload) => ({
  type: SET_TIMER_ACTIVE,
  payload: payload,
});

export const setOnBreak = (payload) => ({
  type: SET_TIMER_ACTIVE,
  payload: payload,
});

export const setBreakTimerActive = (payload) => ({
  type: SET_BREAK_TIMER_ACTIVE,
  payload: payload,
});
