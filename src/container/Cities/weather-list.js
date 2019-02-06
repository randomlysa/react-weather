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
import Sortable from 'sortablejs';

import WeatherOneCity from './weather-onecity';

const StyledWeatherList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  margin-bottom: 4rem;
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

export class WeatherList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsWithSwipe: [],
      modalIsOpen: false,
      cityToDelete: ''
    };

    this.fetchQueue = [];
    // Create draggable during DidUpdate, but keep it from being created more
    // than once. DOM element isn't available during DidMount.
    this.dragCreated = false;
  }

  openModal = city => {
    this.setState({ modalIsOpen: true, cityToDelete: city });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  deleteCity = () => {
    // When using the 'x' button, this.rowToDelete isn't set.
    if (!this.rowToDelete) {
      this.rowToDelete = document.getElementById(this.state.cityToDelete.id);
    }

    this.setState({ modalIsOpen: false });
    this.rowToDelete.classList.add('animated');
    this.rowToDelete.classList.add('faster');
    this.rowToDelete.classList.add('zoomOut');
    setTimeout(() => {
      this.props.actions.deleteCity(this.state.cityToDelete.id);
      this.props.actions.deleteForecast(this.state.cityToDelete.id);
      saveState('weather', this.props.weather);
      // Reset rowToDelete, otherwise deleting with the 'x' button won't work
      // after one city is deleted.
      this.rowToDelete = null;
    }, 500);
  };

  componentDidMount() {
    this.props.actions.fetchWeatherFromLocalStorage();
    this.props.actions.fetchForecastFromLocalStorage();
    this.rowToDelete;
    // Store swipe object in an array. Was going to access objects later
    // and remove swipeleft but that definitely didn't work.
    // I could add a swiperight event later, but I could not disable (.off)
    // or overwrite (use a new empty function) swipeleft.
    this.swipeItems = [];
  }

  componentDidUpdate(prevProps) {
    const el = document.getElementById('draggable');
    if (el && this.dragCreated === false) {
      this.dragCreated = true;
      const sortable = Sortable.create(el, {
        // From the docs:
        store: {
          /**
           * Get the order of elements. Called once during initialization.
           * @param   {Sortable}  sortable
           * @returns {Array}
           */
          get: function(sortable) {
            var order = localStorage.getItem(sortable.options.group.name);
            return order ? order.split('|') : [];
          },

          /**
           * Save the order of elements. Called onEnd (when the item is dropped).
           * @param {Sortable}  sortable
           */
          set: function(sortable) {
            var order = sortable.toArray();
            localStorage.setItem(sortable.options.group.name, order.join('|'));
          }
        },
        handle: '.handle'
      });
    }

    if (prevProps.weather !== this.props.weather) {
      // Something (most likely a this.props.actions.fetchWeatherUpdate, but
      // also maybe a city got deleted?) caused prevProps.weather to not equal
      // this.props.weather. Save this.props.weather to storage.
      saveState('weather', this.props.weather);
    }

    // Used to check how old the current weather is.
    const now = new Date().getTime();

    this.props.weather.map(city => {
      const id = city.id;

      // Track if city.id has swipe attached to it. If it does not, add city.id
      // to state.itemsWithSwipe and add swipe to that city.
      if (!this.state.itemsWithSwipe.includes(city.id)) {
        this.setState(prevState => ({
          itemsWithSwipe: [...prevState.itemsWithSwipe, city.id]
        }));

        const swipeRow = document.getElementById(city.id);
        // Currently swipeRow doesn't exist in testing but this is a good check
        // either way...
        if (swipeRow) {
          this.swipeItems[id] = new Hammer(swipeRow);
          this.swipeItems[id].get('swipe').set({ velocity: 0.5 });

          this.swipeItems[id].on('swipeleft', e => {
            // Can't figure out how to unbind/disable swipe left, so using
            // this instead to disable the modal when needed.
            if (!this.props.options.useSwipeToDelete) return;
            // If delete is confirmed, use css to animate-out this div.
            this.rowToDelete = e.target.closest('.row-swipe');
            // Open a confirmation asking to delete the city or cancel.
            this.openModal(city);
          });
        }
      } // End track cities with swipe and add swipe.

      // Update current weather if > 30 min old.
      const { timeFetched } = city;
      // Convert milliseconds to minutes.
      const timeDifference = (now - timeFetched) / 1000 / 60;

      // Request weather update if fetched over 30 minutes ago.
      if (timeDifference > 30 || timeFetched === undefined) {
        this.props.actions.fetchWeatherUpdate(city.id);
      } // End update current weather if > 30 min old.

      if (this.props.forecast && this.props.forecast[city.id]) {
        // Should forecast be updated.
        // forecast = YYYY-MM-DD of the first item in the forecast.
        const forecast = this.props.forecast[city.id][0].dt_txt.split(' ')[0];
        const today = moment().format('YYYY-MM-DD');
        // If forecast date !== today, update.
        if (forecast === today) {
          if (!this.fetchQueue.includes(id)) {
            this.fetchQueue = [...this.fetchQueue, id];
            this.props.actions.fetchForecastFromOpenWeather(city);
          }
        }
      } else {
        if (!this.fetchQueue.includes(id)) {
          this.fetchQueue = [...this.fetchQueue, id];
          this.props.actions.fetchForecastFromOpenWeather(city);
        }
      }
    }); // this.props.weather.map(city)
  }

  render() {
    if (this.props.weather.length === 0) {
      return (
        <NoCities data-cy="nocities">No cities here - search for one!</NoCities>
      );
    }

    return (
      <StyledWeatherList id="draggable">
        <StyledModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          appElement={document.getElementById('app')}
          className="modal--delete"
        >
          <h3>Delete {this.state.cityToDelete.name}?</h3>
          <button
            data-cy="deleteOneCity"
            className="btn btn-danger"
            onClick={this.deleteCity}
          >
            Delete
          </button>
          <button
            data-cy="cancelDeleteOneCity"
            className="btn btn-light"
            onClick={this.closeModal}
          >
            Cancel
          </button>
        </StyledModal>
        {this.props.weather.map(function(city) {
          return (
            <WeatherOneCity
              city={city}
              forecast={this.props.forecast}
              options={this.props.options}
              openModal={this.openModal}
              key={city.id}
            />
          );
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
