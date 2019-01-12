import React, { Component } from 'react';
// Gets weather from state.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weatherActionCreators from './actions-weather';
import * as forecastActionCreators from './actions-forecast';
import { saveState } from '../../helpers/manage-localStorage';
import moment from 'moment';
import Hammer from 'hammerjs';
import Modal from 'react-modal';
import styled from 'styled-components';

import ForecastData from '../../components/forecast-data';
import WeatherData from '../../components/weather-data';
import GoogleMap from '../../components/google-map';

const StyledWeatherList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;

const WeatherText = styled.div`
  font-family: 'Playfair Display', serif;
  padding: 1rem;
  border-bottom: solid 2px #adaaaa;
`;

const NoCities = styled.div`
  padding: 20px;
  font-size: 2.5rem;
  text-align: center;
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 2px #000;
  padding: 30px;
  background: #fff;
  text-align: center;
`;

class WeatherList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsWithSwipe: [],
      modalIsOpen: false,
      rowToDelete: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
  }

  openModal(city) {
    this.currentCity = city;
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  deleteCity() {
    this.setState({ modalIsOpen: false });
    this.rowToDelete.classList.add('animated');
    this.rowToDelete.classList.add('faster');
    this.rowToDelete.classList.add('zoomOut');
    setTimeout(() => {
      this.props.actions.deleteCity(this.currentCity.id);
      this.props.actions.deleteForecast(this.currentCity.id);
      saveState('weather', this.props.weather);
    }, 500);
  }

  componentDidMount() {
    this.props.actions.fetchWeatherFromLocalStorage();
    this.props.actions.fetchForecastFromLocalStorage();
    this.currentCity = {};
    this.rowToDelete;
    // Store swipe object in an array. Was going to access objects later
    // and remove swipeleft but that definitely didn't work.
    // I could add a swiperight event later, but I could not disable (.off)
    // or overwrite (use a new empty function) swipeleft.
    this.swipeItems = [];
  }

  componentDidUpdate(prevProps) {
    // Used to check how old the current weather is.
    const now = new Date().getTime();

    this.props.weather.map(city => {
      // Track if city.id has swipe attached to it. If it does not, add city.id
      // to state.itemsWithSwipe and add swipe to that city.
      if (!this.state.itemsWithSwipe.includes(city.id)) {
        this.setState(prevState => ({
          itemsWithSwipe: [...prevState.itemsWithSwipe, city.id]
        }));

        const swipeRow = document.getElementById(city.id);
        const id = city.id;

        this.swipeItems[id] = new Hammer(swipeRow);
        this.swipeItems[id].on('swipeleft', e => {
          // Can't figure out how to unbind/disable swipe left, so using
          // this instead to disable the modal when needed.
          if (!this.props.options.useSwipeToDelete) return;
          // If delete is confirmed, use css to animate-out this div.
          this.rowToDelete = e.target.closest('.row-swipe');
          // Open a confirmation asking to delete the city or cancel.
          this.openModal(city);
        });
      } // End track cities with swipe and add swipe.

      // Update current weather if > 30 min old.
      const { timeFetched } = city;
      // Convert milliseconds to minutes.
      const timeDifference = (now - timeFetched) / 1000 / 60;

      // Request weather update if fetched over 30 minutes ago.
      if (timeDifference > 30 || timeFetched === undefined) {
        this.props.actions.fetchWeatherUpdate(city.id);
      } // End update current weather if > 30 min old.
    }); // this.props.weather.map(city)
  }

  renderWeather(cityData) {
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

    const id = cityData.id;
    const name = cityData.name;
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
    const rowClassName = `row-swipe`;
    const forecast = this.props.forecast ? this.props.forecast[id] : null;

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

    return (
      <WeatherText className={rowClassName} id={id} key={id}>
        <h1>{name}</h1>
        <GoogleMap lat={lat} lon={lon} />

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
      </WeatherText>
    );
  }

  render() {
    if (this.props.weather.length === 0) {
      return (
        <NoCities data-cy="nocities">No cities here - search for one!</NoCities>
      );
    }

    return (
      <StyledWeatherList>
        <StyledModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
          className="modal--delete"
        >
          <h3>Delete {this.currentCity.name}?</h3>
          <button className="btn btn-danger" onClick={this.deleteCity}>
            Delete
          </button>
          <button className="btn btn-light" onClick={this.closeModal}>
            Cancel
          </button>
        </StyledModal>
        {this.props.weather.map(function(city) {
          return this.renderWeather(city, this);
        }, this)}
      </StyledWeatherList>
    );
  }
}

// Gets weather from state.
function mapStateToProps({ weather, forecast }) {
  return { weather, forecast }; // same as { weather: weather}
}

function mapDispatchToProps(dispatch) {
  // Assign all actions (import * as actionCreators) to props.actions
  const actions = { ...weatherActionCreators, ...forecastActionCreators };
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherList);
