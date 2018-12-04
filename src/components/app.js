import React, { Component } from 'react';

import SearchBar from '../container/search-bar';
import Notification from '../container/notification';
import WeatherList from '../container/weather-list';
import Footer from '../container/footer';
import CityList from '../container/city-list';

export default class App extends Component {
  componentDidMount() {
    const menu = document.getElementsByClassName('settings-menu__content')[0];
    const body = document.getElementById('body');

    body.addEventListener('click', e => {
      const obj = e.target.classList;
      // Convert classList into an array.
      const classes = Object.keys(obj).map(key => obj[key]);

      // If the area clicked was not 'settings-menu__content', close
      // the dropup menu.
      if (!classes.includes('settings-menu__content')) {
        menu.classList.remove('settings-menu__content--display');
      }
    });
  }
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
