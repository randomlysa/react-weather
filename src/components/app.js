import React, { Component } from 'react';

import SearchBar from '../container/search-bar';
import WeatherList from '../container/weather-list';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <WeatherList />
      </div>
    );
  }
}
