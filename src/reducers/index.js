import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import CityListReducer from './reducer_citylist';
import NotificationReducer from './reducer_notification';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  cityList: CityListReducer,
  notification: NotificationReducer
});

export default rootReducer;
