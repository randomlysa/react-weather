import React, { Component } from 'react';
import Chart from '../components/chart';
import GoogleMap from '../components/google-map';
import ModalConfirmCancelDelete from '../components/modal-confirm-cancel-delete';
import $ from 'jquery';

// Gets weather from state.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

import { loadState, saveState } from '../manageLocalStorage';
import moment from 'moment';

class WeatherList extends Component {
  showModalConfirmCancelDelete(e) {
    const id = e.target.id;
    // Hide the 'x' button.
    $(`#btn-delete-${id}`).fadeOut();
    // Show the div with buttons to confirm/cancel deleting.
    $(`#div-delete-${id}`)
      .css('z-index', '10')
      .fadeIn();
  }

  componentDidMount() {
    this.props.actions.fetchWeatherFromLocalStorage();
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

    return (
      <div className="row row--with-border" key={id}>
        <div className="col-md-3 weather-map-text">
          <GoogleMap lat={lat} lon={lon} />
          <ModalConfirmCancelDelete name={name} id={id} />
          <button
            className="btn btn-danger btn-delete-city"
            id={`btn-delete-${id}`}
            onClick={this.showModalConfirmCancelDelete}
            name={name}
            id={id}
          >
            x
          </button>
          <strong>{name}</strong> <br />
          fetched {timeLastFetched}
        </div>
        <div className="weather-info-text">
          <div className="col-md-9 col-xs-12">
            ({description})
            <br />
            <Chart data={tempInC} units="C" />
            <Chart data={tempInF} units="F" />
            <br />
            <Chart data={humidity} units="%" label="Humidity" />
            <br />
            <i>updated {timeLastUpdated}</i>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.weather.length === 0) {
      return <div className="nocities">No cities here - search for one!</div>;
    }

    return (
      <div>
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
