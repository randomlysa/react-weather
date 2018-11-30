import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeatherFromOpenWeather } from '../actions/index';

import {AsyncTypeahead} from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

import CityList from './city-list'

const searchForCity = (city, limit = 5) => {
    return $.ajax({
        url:  `http://localhost/react-weather/sqlite/sqliteSearchForName.php?city=${city}&limit=${limit}`,
        type: 'GET',
        dataType: 'json'
    })
} // searchForCity

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
        this.setState({cityList: ''})
    }

    onFormSubmit(event) {
        event.preventDefault();
        if (!this.state.city) {
            // user typed in something and clicked search. there is no city
            // in state, search the database for all cities named userInput.
            const userInput = this.typeahead.getInstance().getInput().value;
            searchForCity(userInput, 10)
            .done(data => this.setState({ cityList: data }));
            return;
        }

        const currentId = parseInt(this.state.city.id);
        // Check if the id has already been searched for.
        const hasCity = _.find(this.props.cities, ['id', currentId])

        if (hasCity) {
            return this.setState({
                messageForUser: 'This city is already listed below.'
            });
        }

        // Fetch weather data.
        this.props.fetchWeatherFromOpenWeather(this.state.city);
        this.setState({ messageForUser: '' });
    }

    // For typeahead
    onInputChange(city) {
        this.setState({isLoading: true});

        searchForCity(city).done(data => {
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
            })
          }
        })
        .fail(e => {
          console.log(e);
        }) // ajax
    } // onInputChange

    filterResults(location, props) {
        const {city, country} = location;
        const { text } = props;
        // No commma, easy filter
        if (!text.includes(",")) {
            return _.startsWith(city, text)
        } else {
            // The 'search by country' is already handled by PHP, so this
            // doesn't really filter. It splits the entered text on a comma,
            // then returns any results where the city starts with the city that
            // was entered, ignoring what was after the comma.
            // Example: entered text: "Bos, US"
            // searchForCity = Bos
            // ", US" is ignored, handled by PHP
            const [ searchForCity, searchForCountry ] = text.split(",");
            return _.startsWith(city, searchForCity);
        }

        // return props;
    }

    render() {
        return (
            <div className="row">
                <form onSubmit={this.onFormSubmit} className="input-group">
                    <AsyncTypeahead
                        isLoading={this.state.isLoading}
                        onSearch={query => this.onInputChange(query)}
                        options={this.state.options}
                        labelKey={row => `${row.city}, ${row.area}, ${row.country}`}
                        ref={(typeahead) => this.typeahead = typeahead}
                        placeholder="Check the weather in your favorite cities"
                        onChange={city => this.setState({ city: city[0] }) }
                        filterBy={this.filterResults.bind(this)}
                        />
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </span>
                </form>
                {this.state.messageForUser ? <p>{this.state.messageForUser}</p> : undefined}
                <CityList
                    cityList={this.state.cityList}
                    fetchWeatherAndClear={this.fetchWeatherAndClear.bind(this)}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { cities: state.weather }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeatherFromOpenWeather }, dispatch);
}

// null means we don't need state here.
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);