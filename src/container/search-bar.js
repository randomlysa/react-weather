import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeatherFromOpenWeather } from '../actions/index';

import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

import CityList from './city-list';

const searchForCity = (city, limit = 5) => {
  return $.ajax({
    url: `http://localhost/react-weather/sqlite/sqliteSearchForName.php?city=${city}&limit=${limit}`,
    type: 'GET',
    dataType: 'json'
  });
}; // searchForCity

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // isLoading: needed for typeahead
    // caseSensitive: typeahead setting
    // city: is set to an object when a city is selected from the dropdown
    // options: list of cities returned from searching, used by typeahead
    // messageForUser: errors, etc
    // cityList: a list of cities to select from when typeahead isn't used
    this.state = {
      isLoading: false,
      caseSensitive: false,
      city: '',
      options: [],
      messageForUser: '',
      cityList: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // Used by city-list. Fetches weather info and clears state.cityList.
  fetchWeatherAndClear(city) {
    this.props.fetchWeatherFromOpenWeather(city);
    this.setState({ cityList: '' });
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
    const userInputInOptions = _.find(this.state.options, {
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
      const hasCity = _.find(this.props.cities, ['id', id]);
      if (hasCity) {
        return this.setState({
          messageForUser: 'This city is already listed below.'
        });
      }

      // Fetch weather data.
      this.props.fetchWeatherFromOpenWeather(currentCity);
      // Clear city otherwise this.state.city will always be true after the
      // first search.
      this.setState({ messageForUser: '', city: '' });
    } else {
      // else for - if(this.state.city || userInputInOptions)
      // user typed in something and clicked search OR typed in something and
      // pressed enter. nothing selected from typeahead.
      // there is no city in state, search the database for all cities named
      // userInput.
      searchForCity(userInput, 10).done(data => {
        this.typeahead.getInstance().clear();
        this.setState({ cityList: data });
      });
      return;
    }
  }

  // For typeahead
  onInputChange(city) {
    this.setState({ isLoading: true });

    searchForCity(city)
      .done(data => {
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
      })
      .fail(e => {
        console.log(e);
      }); // ajax
  } // onInputChange

  filterResults(location, props) {
    const { city, country } = location;
    const { text } = props;
    // No commma, easy filter
    if (!text.includes(',')) {
      return _.startsWith(city, text);
    } else {
      // The 'search by country' is already handled by PHP, so this
      // doesn't really filter. It splits the entered text on a comma,
      // then returns any results where the city starts with the city that
      // was entered, ignoring what was after the comma.
      // Example: entered text: "Bos, US"
      // searchForCity = Bos
      // ", US" is ignored, handled by PHP
      const [searchForCity, searchForCountry] = text.split(',');
      return _.startsWith(city, searchForCity);
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
        <form onSubmit={this.onFormSubmit} className="input-group">
          <AsyncTypeahead
            isLoading={this.state.isLoading}
            onSearch={query => this.onInputChange(query)}
            options={this.state.options}
            labelKey={row => `${row.city}, ${row.area}, ${row.country}`}
            ref={typeahead => (this.typeahead = typeahead)}
            placeholder="Check the weather in your favorite cities"
            onChange={city => this.setState({ city: city[0] })}
            filterBy={this.filterResults.bind(this)}
            onKeyDown={e => this.handleKeyDown(e)}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </span>
        </form>
        {this.state.messageForUser ? (
          <p>{this.state.messageForUser}</p>
        ) : (
          undefined
        )}
        <CityList
          cityList={this.state.cityList}
          fetchWeatherAndClear={this.fetchWeatherAndClear.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cities: state.weather };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeatherFromOpenWeather }, dispatch);
}

// null means we don't need state here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
