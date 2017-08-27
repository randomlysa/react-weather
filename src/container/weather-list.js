import React, { Component } from 'react';
import Chart from '../components/chart'
import GoogleMap from '../components/google-map';

// Gets weather from state.
import { connect } from 'react-redux';
import { fetchWeatherFromLocalStorage } from '../actions'
import { loadState, saveState } from '../manageLocalStorage';
import _ from 'lodash';

class WeatherList extends Component {

    componentDidMount()   {
        this.props.fetchWeatherFromLocalStorage();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.weather[0]) {
            saveState(
                nextProps.weather
            );
        }
    }

    renderWeather(cityData) {

        const id = cityData.id;
        const name = cityData.name;
        const description = cityData.weather[0].description;
        const tempsInK = Math.round(cityData.main.temp);
        const tempsInC = tempsInK- 273;
        const tempsInF = Math.round(tempsInC * 9 / 5 + 32);
        const humidity = cityData.main.humidity;
        const { lon, lat } = cityData.coord;

        return (
            <div className="row" key={id}>
                <div className="col-md-6">
                    <GoogleMap lat={lat} lon={lon} />
                    {name} ({description})
                </div>
                <div className="col-md-3">
                    <Chart data={tempsInC} units="C" />
                    &nbsp;/&nbsp;
                    <Chart data={tempsInF} units="F" />
                </div>
                <div className="col-md-3">
                    <Chart data={humidity} units="%" />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.weather.map(this.renderWeather)}
            </div>
        );
    }
}

// Gets weather from state.
function mapStateToProps({ weather }) {
    return { weather }; // same as { weather: weather}
}

export default connect(mapStateToProps, { fetchWeatherFromLocalStorage })(WeatherList)
