import { startTimer, stopTimer, updateWorkTime } from './actions';

const timerMiddleware = (store) => (next) => (action) => {
  if (action.type === 'START_TIMER') {
    const interval = setInterval(() => {
      store.dispatch(updateWorkTime());
    }, 1000);
    // Save the interval ID in the store for later cleanup
    store.dispatch({ type: 'SET_INTERVAL_ID', payload: interval });
  } else if (action.type === 'STOP_TIMER') {
    const intervalId = store.getState().intervalId;
    clearInterval(intervalId);
  }

  return next(action);
};

export default timerMiddleware;
