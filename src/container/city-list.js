import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchWeatherFromOpenWeather,
  setCityList,
  setNotification
} from '../actions/index';
import find from 'lodash/find';

class CityList extends Component {
  fetchWeatherAndClear(city) {
    // Check if the id has already been searched for.
    const id = parseInt(city.id, 10);
    const hasCity = find(this.props.cities, ['id', id]);
    if (hasCity) {
      this.props.setNotification('This city is already in your list');
    } else {
      this.props.fetchWeatherFromOpenWeather(city);
      this.props.setCityList(null);
    }
  }

  renderCities(cityList) {
    return cityList.map(city => {
      return (
        <div key={city.id} data-cy="cityList--city">
          <button
            className="btn btn-link"
            onClick={() => this.fetchWeatherAndClear(city)}
          >
            {city.city}, {city.area}, {city.country}
          </button>
        </div>
      );
    });
  }

  render() {
    const cityList = this.props.cityList;

    let renderItems;
    if (cityList) {
      renderItems = (
        <div data-cy="cityList" className="city-list__container">
          <div className="col" />
          <div className="col-6">
            <button
              type="button"
              className="close"
              aria-label="Close city list"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {this.renderCities(this.props.cityList)}
          </div>
          <div className="col" />
        </div>
      );
    } else renderItems = '';

    return renderItems;
  } // render
} // class CityList

function mapStateToProps({ weather, cityList }) {
  return { cities: weather, cityList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchWeatherFromOpenWeather, setCityList, setNotification },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityList);
