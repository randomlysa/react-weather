import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import find from 'lodash/find';
import styled from 'styled-components';

import {
  fetchWeatherFromOpenWeather,
  setCityList,
  setNotification
} from './actions-weather';

const CityListContainer = styled.div`
  width: 100%;
  text-align: center;
`;

class CityList extends Component {
  fetchWeatherAndClear(city) {
    // Check if the id has already been searched for.
    const id = parseInt(city.id, 10);
    const hasCity = find(this.props.cities, ['id', id]);
    if (hasCity) {
      this.props.setNotification('This city is already in your list');
    } else {
      this.props.fetchWeatherFromOpenWeather(city);
      this.props.setNotification('');
      this.props.setCityList([]);
    }
  }

  closeCityList() {
    this.props.setCityList([]);
    this.props.setNotification('');
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
    if (cityList.length > 0) {
      renderItems = (
        <CityListContainer data-cy="cityList" className="row">
          <div className="col-sm-1 col-lg-3" />
          <div className="col-sm-10 col-lg-6">
            <button
              type="button"
              className="close"
              aria-label="Close city list"
              onClick={this.closeCityList.bind(this)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {this.renderCities(this.props.cityList)}
          </div>
          <div className="col-sm-1 col-lg-3" />
        </CityListContainer>
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
