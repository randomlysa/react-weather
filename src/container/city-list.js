import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeatherFromOpenWeather, setCityList } from '../actions/index';

class CityList extends Component {
  fetchWeatherAndClear(city) {
    this.props.fetchWeatherFromOpenWeather(city);
    this.props.setCityList(null);
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

function mapStateToProps({ cityList }) {
  return { cityList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchWeatherFromOpenWeather, setCityList },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityList);
