import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

import { WeatherList } from './weather-list';

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
  cod: 200,
  timeFetched: 0
};

const props = {
  weather: [],
  actions: {
    fetchWeatherFromLocalStorage: jest.fn(),
    fetchWeatherFromOpenWeather: jest.fn(),
    fetchForecastFromOpenWeather: jest.fn(),
    fetchForecastFromLocalStorage: jest.fn()
  }
};

const props2 = {
  weather: [exampleWeatherResponse],
  actions: {
    fetchWeatherUpdate: jest.fn(),
    fetchWeatherFromLocalStorage: jest.fn(),
    fetchWeatherFromOpenWeather: jest.fn(),
    fetchForecastFromOpenWeather: jest.fn(),
    fetchForecastFromLocalStorage: jest.fn()
  },
  options: {}
};

it('should load when there are no cities', () => {
  const wrapper = mount(<WeatherList {...props} />);
  expect(wrapper.text()).toBe('No cities here - search for one!');
});

it('should display a city when pass in as a prop', () => {
  const wrapper = mount(<WeatherList {...props2} />);
  expect(wrapper.text()).toMatch(/Mountain View/);
});

it('should call (save to) localstorage when a city is added', () => {
  let node = document.createElement('div');
  // Note that first time props is used, second time, props2!
  ReactDOM.render(<WeatherList {...props} />, node);
  ReactDOM.render(<WeatherList {...props2} />, node);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
});

it('should fetchWeatherUpdate when weather is > 30 min old', () => {
  let node = document.createElement('div');
  ReactDOM.render(<WeatherList {...props2} />, node);
  expect(props2.actions.fetchWeatherUpdate).toHaveBeenLastCalledWith(
    exampleWeatherResponse.id
  );
});

it('should fetch weather, forecast from localstorage when mounted', () => {
  let node = document.createElement('div');
  // Note that first time props is used, second time, props2!
  ReactDOM.render(<WeatherList {...props} />, node);
  expect(props2.actions.fetchWeatherFromLocalStorage).toHaveBeenCalledWith();
  expect(props2.actions.fetchForecastFromLocalStorage).toHaveBeenCalledWith();
});
