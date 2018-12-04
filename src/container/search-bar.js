import React, { Component } from 'react';
import find from 'lodash/find';
import startsWith from 'lodash/startsWith';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchWeatherFromOpenWeather,
  setCityList,
  setNotification
} from '../actions/index';

import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { logError } from '../helpers/loggly';

const searchForCity = (city, limit = 5) => {
  const env = process.env.NODE_ENV;
  let url_base = 'code.randomlysa.com/weather';
  if (env === 'development') url_base = 'localhost/react-weather';

  // development: localhost/react-weather
  // production code.randomlysa.com/weather
  return axios({
    method: 'get',
    url: `http://${url_base}/sqlite/sqliteSearchForName.php?city=${city}&limit=${limit}`,
    responseType: 'json'
  });
}; // searchForCity

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // isLoading: needed for typeahead
    // caseSensitive: typeahead setting
    // city: is set to an object when a city is selected from the dropdown
    // options: list of cities returned from searching, used by typeahead
    // cityList: a list of cities to select from when typeahead isn't used
    this.state = {
      isLoading: false,
      caseSensitive: false,
      city: '',
      options: [],
      cityList: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    // Scenarios:
    // 1. User typed in a city, selected it with keyboard/mouse/touch, and
    // pressed Submit. Everything here works as expected.

    // 2. User typed in a city, selected a result from typeahead, and pressed
    // enter. In this case, `userInput` should be in state.options. Find that
    // option and search for it.

    // 3. User typed in a city and pressed enter without selecting anything.
    // Search the database for matching cities and show a list.

    if (event) event.preventDefault();
    const userInput = this.typeahead.getInstance().getInput().value;
    let [city, area, country] = userInput.split(',').map(i => i.trim());

    // Returns the object if it's in state otherwise undefined.
    const userInputInOptions = find(this.state.options, {
      city,
      country,
      area
    });

    if (this.state.city || userInputInOptions) {
      let currentCity;
      if (this.state.city) {
        currentCity = this.state.city;
      } else {
        currentCity = userInputInOptions; // object
      }

      const id = parseInt(currentCity.id, 10);
      // Check if the id has already been searched for.
      const hasCity = find(this.props.cities, ['id', id]);
      if (hasCity) {
        return this.props.setNotification('This city is already in your list');
      }

      // Fetch weather data.
      this.props.fetchWeatherFromOpenWeather(currentCity);
      // Todo: setState city: '' still needed?
      this.setState({ city: '' });
      this.props.setNotification('');
    } else {
      // else for - if(this.state.city || userInputInOptions)
      // user typed in something and clicked search OR typed in something and
      // pressed enter. nothing selected from typeahead.
      // there is no city in state, search the database for all cities named
      // userInput.
      try {
        searchForCity(userInput, 10).then(({ data }) => {
          this.typeahead.getInstance().clear();
          this.setState({ cityList: data });
          this.props.setCityList(data);
        });
      } catch (e) {
        console.log(e);
        window._LTracker.push(e);
      }
      return;
    }

    // Todo: Maybe better to clear on focus?
    this.typeahead.getInstance().clear();
  }

  // For typeahead
  onInputChange(city) {
    this.setState({ isLoading: true });

    try {
      searchForCity(city).then(({ data }) => {
        if (data) {
          this.setState({
            isLoading: false,
            // Move the label to the component prop. Return data so id is
            // included, since it's recommended to have one.
            // See "Duplicate Data" section:
            // https://github.com/ericgio/react-bootstrap-typeahead/blob/27790f1e70a994432c55128fe15e50ba11e76fcf/docs/Data.md
            options: data
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } catch (e) {
      console.log(e);
      window._LTracker.push(e);
    } // try/catch
  } // onInputChange

  filterResults(location, props) {
    const { city, country } = location;
    const { text } = props;
    // No commma, easy filter
    if (!text.includes(',')) {
      return startsWith(city, text);
    } else {
      // The 'search by country' is already handled by PHP, so this
      // doesn't really filter. It splits the entered text on a comma,
      // then returns any results where the city starts with the city that
      // was entered, ignoring what was after the comma.
      // Example: entered text: "Bos, US"
      // searchForCity = Bos
      // ", US" is ignored, handled by PHP
      const [searchForCity, searchForCountry] = text.split(',');
      return startsWith(city, searchForCity);
    }

    // return props;
  }

  // Lets a user search by pressing enter without selecting from typeahead.
  // Previous, typeahead would do nothing if enter was pressed but no selection
  // had been made.
  handleKeyDown(e) {
    if (e.key === 'Enter') this.onFormSubmit();
  }

  // Props for AsyncTypeahead:
  // isLoading - Whether or not a request is currently pending
  //    * Necessary for the component to know when new results are available
  // onSearch - updates results when a user is typing
  // options - results to show in dropdown when user is searching
  // labelKey - sets the text that is diplayed - "city, area, country"
  // ref - used for this.typeahead.getInstance().clear()
  // onChange - when a city is selected, set that city to state.city
  // filterBy - custom filtering
  // onKeyDown - allow using enter key without selecting from typeahead
  // onInputChange - could be used to set value = state on each keypress.
  render() {
    return (
      <div className="row">
        <form
          onSubmit={this.onFormSubmit}
          data-cy="submit"
          className="input-group"
        >
          <AsyncTypeahead
            isLoading={this.state.isLoading}
            onSearch={query => this.onInputChange(query)}
            options={this.state.options}
            labelKey={row => `${row.city}, ${row.area}, ${row.country}`}
            ref={typeahead => (this.typeahead = typeahead)}
            placeholder="Check the weather in your favorite cities"
            // onChange={city => this.setState({ city: city[0] })}
            filterBy={this.filterResults.bind(this)}
            onKeyDown={e => this.handleKeyDown(e)}
            data-cy="searchbar"
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </span>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cities: state.weather };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchWeatherFromOpenWeather, setCityList, setNotification },
    dispatch
  );
}

// null means we don't need state here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
