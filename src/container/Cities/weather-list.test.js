import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

import { WeatherList } from './weather-list';
import * as weatherActionCreators from './actions-weather';
import * as forecastActionCreators from './actions-forecast';
import { saveState } from '../../helpers/manage-localStorage';

const mockFetchWeather = jest.fn();

const props = {
  weather: [],
  actions: {
    fetchWeatherFromLocalStorage: jest.fn(),
    fetchWeatherFromOpenWeather: jest.fn(),
    fetchForecastFromOpenWeather: jest.fn(),
    fetchForecastFromLocalStorage: jest.fn()
  }
};

const exampleWeatherResponse = {
  coord: { lon: -122.09, lat: 37.39 },
  sys: {
    type: 3,
    id: 168940,
    message: 0.0297,
    country: 'US',
    sunrise: 1427723751,
    sunset: 1427768967
  },
  weather: [
    { id: 800, main: 'Clear', description: 'Sky is Clear', icon: '01n' }
  ],
  base: 'stations',
  main: {
    temp: 285.68,
    humidity: 74,
    pressure: 1016.8,
    temp_min: 284.82,
    temp_max: 286.48
  },
  wind: { speed: 0.96, deg: 285.001 },
  clouds: { all: 0 },
  dt: 1427700245,
  id: 0,
  name: 'Mountain View',
  cod: 200
};

it.only('should load when there are no cities', () => {
  const wrapper = mount(<WeatherList {...props} />);
  expect(wrapper.text()).toBe('No cities here - search for one!');
});

it('should save a city to local storage after fetching from openweather', () => {
  const wrapper = mount(<WeatherList {...props} />);
});
