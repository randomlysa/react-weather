import axios from 'axios';
import { loadState } from '../../helpers/manage-localStorage';

const API_KEY = 'df53338709b54a2247c6e16358430a33';
const WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

export const FETCH_WEATHER_FROM_OPENWEATHER = 'FETCH_WEATHER_FROM_OPENWEATHER';
export const FETCH_WEATHER_FROM_OPENWEATHER_FULFILLED =
  'FETCH_WEATHER_FROM_OPENWEATHER_FULFILLED';
export const FETCH_WEATHER_FROM_LOCALSTORAGE =
  'FETCH_WEATHER_FROM_LOCALSTORAGE';
export const FETCH_WEATHER_UPDATE = 'FETCH_WEATHER_UPDATE';
export const FETCH_WEATHER_UPDATE_FULFILLED = 'FETCH_WEATHER_UPDATE_FULFILLED';

export const DELETE_ONE_CITY = 'DELETE_ONE_CITY';
export const NOTIFICATION = 'NOTIFICATION';

export const SET_CITY_LIST = 'SET_CITY_LIST';

let numberOfRequests = 0;
let listOfCities = [];

// In weather-list > componentWillReceiveProps, the initial run requests an
// update for each city that has weather that was requested more than 30
// minutes ago. If there is more than once city to update, once one city is
// updated and componentWillReceiveProps runs, it will request another update
// for the remaining cities that are still out of date. listOfCities keeps
// track of what cities have had an update requested and ignores duplicate
// requests.
function manageRequestVolume(url, cityId) {
  // 2018 11 29 - tested, manageRequestVolume is still working  for
  // multiple city updates - each city was only requested once. ~
  if (numberOfRequests > 10) {
    alert('Sorry, too many requests... take a break!');
    return;
  }
  if (listOfCities.indexOf(cityId) === -1) {
    listOfCities = [...listOfCities, cityId];
    numberOfRequests++;
    return axios.get(url);
  }
}

export function fetchWeatherFromOpenWeather(location) {
  const { area } = location;
  let url;

  // Location is an object that was fetched from my database. It should have
  // the openweather city id.
  if (typeof location === 'object') {
    url = `${WEATHER_URL}&id=${location.id}`;
  }

  // const url = `${WEATHER_URL}&q=${city},${alpha2code}`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER_FROM_OPENWEATHER,
    payload: request,
    meta: { area }
  };
}

export function fetchWeatherFromLocalStorage() {
  const request = loadState() || [];

  return {
    type: FETCH_WEATHER_FROM_LOCALSTORAGE,
    payload: request
  };
}

export function fetchWeatherUpdate(cityId) {
  const url = `${WEATHER_URL}&id=${cityId}`;
  const request = manageRequestVolume(url, cityId);

  return {
    type: FETCH_WEATHER_UPDATE,
    payload: request
  };
}

export function deleteCity(id) {
  const request = id;
  return {
    type: DELETE_ONE_CITY,
    payload: request
  };
}

export function setCityList(obj) {
  return {
    type: SET_CITY_LIST,
    payload: obj
  };
}

export function setNotification(message) {
  return {
    type: NOTIFICATION,
    payload: message
  };
}
