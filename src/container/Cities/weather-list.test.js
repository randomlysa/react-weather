import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

import { WeatherList } from './weather-list';
import { weather1, weather2, forecast1, forecast2 } from './sample-data-test';

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
  weather: [weather1],
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
    weather1.id
  );
});

it('should fetch weather, forecast from localstorage when mounted', () => {
  let node = document.createElement('div');
  // Note that first time props is used, second time, props2!
  ReactDOM.render(<WeatherList {...props} />, node);
  expect(props2.actions.fetchWeatherFromLocalStorage).toHaveBeenCalledWith();
  expect(props2.actions.fetchForecastFromLocalStorage).toHaveBeenCalledWith();
});
