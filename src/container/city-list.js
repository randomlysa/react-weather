import React, { Component } from 'react';

export default class CityList extends Component {
  renderCities(cityList) {
    return cityList.map(city => {
      return (
        <div key={city.id} data-cy="cityList--city">
          <button
            className="btn btn-link"
            onClick={() => this.props.fetchWeatherAndClear(city)}
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
        <div className="row" data-cy="cityList">
          <div>{this.renderCities(cityList)}</div>
        </div>
      );
    } else renderItems = '';

    return renderItems;
  } // render
} // class CityList

// Todo: have an option to close the list without selecting a city.
