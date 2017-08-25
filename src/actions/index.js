import axios from 'axios';

const API_KEY = '0ef0dca7d078d40465c8a1d8cfd77296';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`
export const FETCH_WEATHER = 'FETCH_WEATHER'

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},US`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    }
}