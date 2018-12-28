import React, { Component } from 'react';
import { loadState, saveState } from '../manageLocalStorage';

import SearchBar from '../container/search-bar';
import Notification from '../container/notification';
import WeatherList from '../container/weather-list';
import Footer from '../container/footer';
import CityList from '../container/city-list';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { UseSwipetoDelete: true };
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  componentDidMount() {
    const settings = loadState('settings');
    if (settings && settings.hasOwnProperty('UseSwipetoDelete')) {
      const UseSwipetoDelete = settings.UseSwipetoDelete;
      this.setState({ UseSwipetoDelete });
    }

    // const menu = document.getElementsByClassName('settings-menu__content')[0];
    // const body = document.getElementById('body');
    // body.addEventListener('click', e => {
    //   const obj = e.target.classList;
    //   // Convert classList into an array.
    //   const classes = Object.keys(obj).map(key => obj[key]);
    //   // If the area clicked was not 'settings-menu__content', close
    //   // the dropup menu.
    //   if (!classes.includes('settings-menu__content')) {
    //     menu.classList.remove('settings-menu__content--display');
    //   }
    // });
  }

  updateCheckbox(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // Find text for label and remove spaces
    const text = e.target.closest('label').textContent.replace(/\s/g, '');
    this.setState({ [text]: value });
    // saveState(null, { UseSwipetoDelete: value });
  }

  render() {
    return (
      <div id="app">
        <SearchBar />
        <Notification />
        <CityList />
        <WeatherList useSwipeToDelete={this.state.useSwipeToDelete} />
        <Footer
          updateCheckbox={this.updateCheckbox}
          checkBoxChecked={this.state}
        />
      </div>
    );
  }
}
