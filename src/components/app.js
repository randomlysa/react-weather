import React, { Component } from 'react';

import SearchBar from '../container/search-bar';
import Notification from '../container/notification';
import WeatherList from '../container/weather-list';
import Footer from '../container/footer';
import CityList from '../container/city-list';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <SearchBar />
        <Notification />
        <CityList />
        <WeatherList />
        <Footer />
      </div>
    );
  }
}
