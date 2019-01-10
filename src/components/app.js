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

    this.state = {
      useSwipeToDelete: true,
      showFahrenheit: true,
      showCelcius: true
    };
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  componentDidMount() {
    const settings = loadState('settings');
    if (settings) {
      this.setState({ ...settings.settings });
    }
  }

  updateCheckbox(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // Find text for label and remove spaces
    const text = e.target.closest('label').textContent.replace(/\s/g, '');
    const textFinal = text.slice(0, 1).toLowerCase() + text.slice(1);
    this.setState({ [textFinal]: value }, () => {
      saveState(null, { settings: this.state });
    });
  }

  render() {
    return (
      <div id="app">
        <SearchBar />
        <Notification />
        <CityList />
        <WeatherList options={this.state} />
        <Footer
          updateCheckbox={this.updateCheckbox}
          checkBoxChecked={this.state}
        />
      </div>
    );
  }
}
