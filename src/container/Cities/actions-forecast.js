import axios from 'axios';
import { loadState } from '../../helpers/manage-localStorage';

const API_KEY = 'df53338709b54a2247c6e16358430a33';
const FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric`;

export const FETCH_FORECAST_FROM_OPENWEATHER =
  'FETCH_FORECAST_FROM_OPENWEATHER';
export const FETCH_FORECAST_FROM_LOCALSTORAGE =
  'FETCH_FORECAST_FROM_LOCALSTORAGE';
export const DELETE_ONE_FORECAST = 'DELETE_ONE_FORECAST';

export function fetchForecastFromOpenWeather(location) {
  let url;

  if (typeof location === 'object') {
    url = `${FORECAST_URL}&id=${location.id}`;
  } else if (typeof location === 'string') {
    url = `${FORECAST_URL}&id=${location}`;
  }

  // returns weather in 3 hour increments (8 arrays per day, first day may not
  // start at 00:00:00)
  const request = axios.get(url);

  return {
    type: FETCH_FORECAST_FROM_OPENWEATHER,
    payload: request
  };
}

export function fetchForecastFromLocalStorage() {
  const payload = loadState('weather_forecast') || null;
  return {
    type: FETCH_FORECAST_FROM_LOCALSTORAGE,
    payload
  };
}

// Payload = city id
export function deleteForecast(payload) {
  return {
    type: DELETE_ONE_FORECAST,
    payload
  };
}
