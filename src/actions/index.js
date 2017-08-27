import _ from 'lodash';
import axios from 'axios';
import { loadState } from '../manageLocalStorage';
import { codes } from 'iso-country-codes';

const API_KEY = '0ef0dca7d078d40465c8a1d8cfd77296';
const WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
const UVI_URL = `http://api.openweathermap.org/data/2.5/uvi?appid=${API_KEY}`; // &lat={lat}&lon={lon}

export const FETCH_WEATHER_FROM_OPENWEATHER = 'FETCH_WEATHER_FROM_OPENWEATHER';
export const FETCH_WEATHER_FROM_LOCALSTORAGE = 'FETCH_WEATHER_FROM_LOCALSTORAGE';

export function fetchWeatherFromOpenWeather(location, cityId) {
    let url;
    if (cityId) {
        url = `${WEATHER_URL}&id=${cityId}`;
    } else {
        const items = location.split(",")
        const [city, country = "United States of America (the)"] = items;
        const alpha2code = _.filter(codes, {"name": country.trim() })[0].alpha2;

        url = `${WEATHER_URL}&q=${city},${alpha2code}`;
    }
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
