import React, { Component } from 'react';
// Gets weather from state.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import { saveState } from '../manageLocalStorage';
import moment from 'moment';
import Hammer from 'hammerjs';

import Chart from '../components/chart';
import GoogleMap from '../components/google-map';

class WeatherList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsWithSwipe: []
    };
  }
  componentDidMount() {
    this.props.actions.fetchWeatherFromLocalStorage();
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
        // Todo - add confirmation and/or animation and then
        // actually delete the city, not just the element. Or
        // can I delete the city and not bother with deleting
        // the element?
        const elementToRemove = e.target.closest('.row-swipe');
        elementToRemove.parentNode.removeChild(elementToRemove);
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
        <div className="col-md-3 weather-map-text">
          <GoogleMap lat={lat} lon={lon} />
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
      return (
        <div className="nocities" data-cy="nocities">
          No cities here - search for one!
        </div>
      );
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
