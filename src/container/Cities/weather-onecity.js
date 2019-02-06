import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import ForecastData from '../../components/forecast-data';
import WeatherData from '../../components/weather-data';
import GoogleMapLink from '../../components/google-map-link';

const Draghandle = styled.i`
  float: left;
  transition: all 0.3s ease-in;
  cursor: pointer;
  color: #b4b4b4;

  :hover {
    color: #000; /* same color as delete button */
  }
`;

const CloseButton = styled.i`
  float: right;
  transition: all 0.3s;
  cursor: pointer;
  color: #b4b4b4;

  :hover {
    color: #dc3545; /* same color as delete button */
  }
`;

const WeatherText = styled.div`
  font-family: 'Playfair Display', serif;
  padding: 1rem;
  border-bottom: solid 2px #adaaaa;
`;

export class WeatherOneCity extends Component {
  render() {
    // For conditional rendering
    const {
      showFetched,
      showUpdated,
      showCelcius,
      showFahrenheit,
      showHumidity,
      showSunrise,
      showSunset
    } = this.props.options;

    const cityData = this.props.city;
    const id = cityData.id;
    let name = cityData.name;
    // Todo: make optional?
    if (name.length > 22) name = name.slice(0, 20) + '...';
    const description = cityData.weather[0].description;
    const icon = `https://openweathermap.org/img/w/${
      cityData.weather[0].icon
    }.png`;
    const tempInC = Math.round(cityData.main.temp);
    const tempInF = Math.round((tempInC * 9) / 5 + 32);
    const humidity = cityData.main.humidity;
    const { lon, lat } = cityData.coord;
    const timeLastUpdated = moment.unix(cityData.dt).fromNow();
    const timeLastFetched = moment(cityData.timeFetched).fromNow();
    const forecast = this.props.forecast ? this.props.forecast[id] : null;
    const area = cityData.area;
    const country = cityData.sys.country;

    // Sunrise, sunset
    const { sunrise, sunset } = cityData.sys;
    const formatSunrise = moment.unix(sunrise).format('HH:mm');
    const formatSunset = moment.unix(sunset).format('HH:mm');

    // Setup dashes between sunrise, sunset and time fetched, time updated.
    let showDashFetchedUpdated, showDashSunrise;
    if (showFetched && showUpdated) showDashFetchedUpdated = ' - ';
    else showDashFetchedUpdated = '';
    if (showSunrise && showSunset) showDashSunrise = ' - ';
    else showDashSunrise = '';

    // Class for close button (hopefully useful for testing / which button to click)
    const closeButtonClassName = `${id}_closeButton material-icons`;

    return (
      <WeatherText>
        <Draghandle className="handle material-icons">drag_handle</Draghandle>
        <div className="row-swipe" id={id} key={id}>
          <CloseButton
            className={closeButtonClassName}
            onClick={this.props.openModal.bind(this, cityData)}
          >
            close
          </CloseButton>
          <h1>{name}</h1>
          {/* don't include comma if no 'area' */}
          {area && `${area},`} {country}
          <GoogleMapLink lat={lat} lon={lon} />
          {showSunrise && `${formatSunrise}`}
          {showDashSunrise}
          {showSunset && `${formatSunset}`}
          <br />
          <em>
            {showFetched && `fetched ${timeLastFetched}`}
            {showDashFetchedUpdated}
            {showUpdated && `updated ${timeLastUpdated}`}
          </em>
          <br />
          <img src={icon} alt={description} />
          {showCelcius && <WeatherData data={tempInC} units="C" />}
          {showFahrenheit && <WeatherData data={tempInF} units="F" />}
          <br />
          {showHumidity && (
            <WeatherData data={humidity} units="%" label="Humidity" />
          )}
          <ForecastData data={forecast} options={this.props.options} />
        </div>
      </WeatherText>
    );
  }
}

export default WeatherOneCity;
