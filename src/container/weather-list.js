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
      modalIsOpen: false
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
    this.props.actions.deleteCity(this.currentCity.id);
  }

  componentDidMount() {
    this.props.actions.fetchWeatherFromLocalStorage();
    this.currentCity = {};
  }

  componentDidUpdate() {
    this.props.weather.map(city => {
      if (!this.state.itemsWithSwipe.includes(city.id)) {
        this.setState(prevState => ({
          itemsWithSwipe: [...prevState.itemsWithSwipe, city.id]
        }));
      }
      const swipeMap = document.getElementById(city.id);
      const mc = new Hammer.Manager(swipeMap);
      const Swipe = new Hammer.Swipe();
      mc.add(Swipe);
      mc.on('swipeleft', e => {
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
          Delete {this.currentCity.name}?
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
