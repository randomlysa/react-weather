import axios from 'axios';
import { loadState } from '../manageLocalStorage';

const API_KEY = '0ef0dca7d078d40465c8a1d8cfd77296';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export const FETCH_WEATHER_FROM_OPENWEATHER = 'FETCH_WEATHER_FROM_OPENWEATHER';
export const FETCH_WEATHER_FROM_LOCALSTORAGE = 'FETCH_WEATHER_FROM_LOCALSTORAGE';

export function fetchWeatherFromOpenWeather(city) {
    const url = `${ROOT_URL}&q=${city},US`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER_FROM_OPENWEATHER,
        payload: request
    }
}

export function fetchWeatherFromLocalStorage() {
    const request = loadState() || [];

    return {
        type: FETCH_WEATHER_FROM_LOCALSTORAGE,
        payload: request
    }
}
