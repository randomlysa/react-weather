import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import ErrorReducer from './reducer_errormessage';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  error: ErrorReducer
});

export default rootReducer;
