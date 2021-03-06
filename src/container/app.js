import React, { Component } from 'react';
import { loadState, saveState } from '../helpers/manage-localStorage';

import SearchBar from './SearchBar/search-bar';
import Notification from './Notifications/notification';
import WeatherList from './Cities/weather-list';
import Footer from './Footer/footer';
import CityList from './CityList/city-list';

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
      saveState('weather_settings', { settings: this.state });
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
