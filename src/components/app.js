import React, { Component } from 'react';

import SearchBar from '../container/search-bar';
import ErrorMessage from '../container/error-message.js';
import WeatherList from '../container/weather-list';
import Footer from '../container/footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ErrorMessage />
        <WeatherList />
        <Footer />
      </div>
    );
  }
}
