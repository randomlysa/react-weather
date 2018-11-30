import React, { Component } from 'react';

import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeatherFromOpenWeather } from '../actions/index';

import {AsyncTypeahead} from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        // term: updated onInputChange
        // isLoading: needed for typeahead
        // caseSensitive: typeahead setting
        // city: is set to an object when a city is selected from the dropdown
        // options: list of cities returned from searching, used by typeahead
        this.state = {
            term: '',
            isLoading: false,
            caseSensitive: false,
            city: '',
            options: []
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        // Fetch weather data.
        this.props.fetchWeatherFromOpenWeather(this.state.city);
        this.setState({ term: '' });
    }

    // For typeahead
    onInputChange(query) {
        this.setState({isLoading: true});

        $.ajax({
          url:  `http://localhost/react-weather/sqlite/sqliteSearchForName.php?city=${query}`,
          type: 'GET',
          dataType: 'json'
        })
        .done(data => {
          if (data) {
            this.setState({
              isLoading: false,
              options: data.map(row => {
                // Typeahead filters by label.
                // Make a label with city, area, country name
                const label = `${row.city}, ${row.area}, ${row.country}`;
                return {...row, label }
              })
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

    render() {
        return (
            <div className="row">
                <form onSubmit={this.onFormSubmit} className="input-group">
                    <AsyncTypeahead
                        isLoading={this.state.isLoading}
                        onSearch={query => this.onInputChange(query)}
                        options={this.state.options}
                        ref="searchFor"

                        placeholder="Check the weather in your favorite cities"
                        className="form-control"
                        value={this.state.term}
                        onChange={city => this.setState({ city: city[0] }) }
                        />
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </span>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeatherFromOpenWeather }, dispatch);
}

// null means we don't need state here.
export default connect(null, mapDispatchToProps)(SearchBar);