import { combineReducers } from 'redux';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  timer: timerReducer,
});

export default rootReducer;
