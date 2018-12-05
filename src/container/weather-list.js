import React, { Component } from 'react';
// Gets weather from state.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import { saveState } from '../manageLocalStorage';
import moment from 'moment';
import Hammer from 'hammerjs';
import Modal from 'react-modal';

import Chart from '../components/chart';
import GoogleMap from '../components/google-map';

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
      saveState(this.props.weather);
    }, 500);
  }

  componentDidMount() {
    this.props.actions.fetchWeatherFromLocalStorage();
    this.currentCity = {};
    this.rowToDelete;
    // Store swipe object in an array. Was going to access objects later
    // and remove swipeleft but that definitely didn't work.
    // I could add a swiperight event later, but I could not disable (.off)
    // or overwrite (use a new empty function) swipeleft.
    this.swipeItems = [];
  }

  componentDidUpdate() {
    this.props.weather.map(city => {
      if (!this.state.itemsWithSwipe.includes(city.id)) {
        this.setState(prevState => ({
          itemsWithSwipe: [...prevState.itemsWithSwipe, city.id]
        }));
      }
      const swipeRow = document.getElementById(city.id);
      const id = city.id;

      this.swipeItems[id] = new Hammer(swipeRow);
      this.swipeItems[id].on('swipeleft', e => {
        // Can't figure out how to unbind/disable swipe left, so using
        // this instead to disable the modal when needed.
        if (!this.props.useSwipeToDelete) return;
        // If delete is confirmed, use css to animate-out this div.
        this.rowToDelete = e.target.closest('.row-swipe');
        // Open a confirmation asking to delete the city or cancel.
        this.openModal(city);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.weather[0]) {
      saveState(nextProps.weather);
    }

    const now = new Date().getTime();

    nextProps.weather.map(city => {
      const { timeFetched } = city;
      // Convert milliseconds to minutes.
      const timeDifference = (now - timeFetched) / 1000 / 60;

      // Request weather update if fetched over 30 minutes ago.
      if (timeDifference > 30 || timeFetched === undefined) {
        this.props.actions.fetchWeatherUpdate(city.id);
      }
    });
  }

  renderWeather(cityData) {
    const id = cityData.id;
    const name = cityData.name;
    const description = cityData.weather[0].description;
    const tempInC = Math.round(cityData.main.temp);
    const tempInF = Math.round((tempInC * 9) / 5 + 32);
    const humidity = cityData.main.humidity;
    const { lon, lat } = cityData.coord;
    const timeLastUpdated = moment.unix(cityData.dt).fromNow();
    const timeLastFetched = moment(cityData.timeFetched).fromNow();
    const rowClassName = `row row--with-border row-swipe`;

    return (
      <div className={rowClassName} id={id} key={id}>
        <div className="col-md-3 weather-map-text text-center">
          <GoogleMap lat={lat} lon={lon} />
          <strong>{name}</strong> <br />
          <em>fetched {timeLastFetched}</em>
        </div>
        <div className="col-md-9 col-xs-12 weather-info-text text-center">
          ({description})
          <Chart data={tempInC} units="C" />
          <Chart data={tempInF} units="F" />
          <br />
          <Chart data={humidity} units="%" label="Humidity" />
          <br />
          <i>updated {timeLastUpdated}</i>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.weather.length === 0) {
      return (
        <div className="nocities" data-cy="nocities">
          No cities here - search for one!
        </div>
      );
    }

    return (
      <div>
        <Modal
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
        </Modal>
        {this.props.weather.map(function(city) {
          return this.renderWeather(city, this);
        }, this)}
      </div>
    );
  }
}

// Gets weather from state.
function mapStateToProps({ weather }) {
  return { weather }; // same as { weather: weather}
}

function mapDispatchToProps(dispatch) {
  // Assign all actions (import * as actionCreators) to props.actions
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherList);
