import React, { Component } from 'react';

export default class CityList extends Component {
  renderCities(cityList) {
    return cityList.map(city => {
      return (
        <p key={city.id}>
          <button onClick={() => this.props.fetchWeatherAndClear(city)}>
            {city.city}, {city.area}, {city.country}
          </button>
        </p>
      );
    });
  }

  render() {
    const cityList = this.props.cityList;

    let renderItems;
    if (cityList) {
      renderItems = <div className="row">{this.renderCities(cityList)}</div>;
    } else renderItems = '';

    return renderItems;
  } // render
} // class CityList
