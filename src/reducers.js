import { combineReducers } from 'redux';
import ForecastReducer from './container/Cities/reducer-forecast';
import WeatherReducer from './container/Cities/reducer-weather';
import CityListReducer from './container/Cities/reducer-citylist';
import NotificationReducer from './container/Notifications/reducer-notification';

const rootReducer = combineReducers({
  forecast: ForecastReducer,
  weather: WeatherReducer,
  cityList: CityListReducer,
  notification: NotificationReducer
});

export default rootReducer;
