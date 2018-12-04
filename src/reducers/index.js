import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import CityListReducer from './reducer_citylist';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  cityList: CityListReducer
});

export default rootReducer;
