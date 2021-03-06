import axios from 'axios';
import { loadState } from '../../helpers/manage-localStorage';
import { WEATHER_API_KEY } from '../../helpers/config.js';

const FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${WEATHER_API_KEY}&units=metric`;

export const FETCH_FORECAST_FROM_OPENWEATHER =
  'FETCH_FORECAST_FROM_OPENWEATHER';
export const FETCH_FORECAST_FROM_OPENWEATHER_FULFILLED =
  'FETCH_FORECAST_FROM_OPENWEATHER_FULFILLED';

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
    payload: request,
    meta: {
      throttle: 2000
    }
  };
}

export function fetchForecastFromLocalStorage() {
  const payload = loadState('weather_forecast') || {};

  return {
    type: FETCH_FORECAST_FROM_LOCALSTORAGE,
    payload,
    meta: {
      throttle: 2000
    }
  };
}

// Payload = city id
export function deleteForecast(payload) {
  return {
    type: DELETE_ONE_FORECAST,
    payload
  };
}
