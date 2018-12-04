import React, { Component } from 'react';

import SearchBar from '../container/search-bar';
import WeatherList from '../container/weather-list';
import Footer from '../container/footer';
import CityList from '../container/city-list';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <SearchBar />
        <CityList />
        <WeatherList />
        <Footer />
      </div>
    );
  }
}
