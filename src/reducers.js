import { combineReducers } from 'redux';
import WeatherReducer from './container/Cities/reducer-weather';
import CityListReducer from './container/Cities/reducer-citylist';
import NotificationReducer from './container/Notifications/reducer-notification';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  cityList: CityListReducer,
  notification: NotificationReducer
});

export default rootReducer;
