import React, { Component } from 'react';
import Chart from '../components/chart'
import GoogleMap from '../components/google-map';

// Gets weather from state.
import { connect } from 'react-redux';
import { fetchWeatherFromLocalStorage, fetchWeatherUpdate } from '../actions'
import { loadState, saveState } from '../manageLocalStorage';
import moment from 'moment';

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

        const now = new Date().getTime();

        nextProps.weather.map((city) => {
            const { timeFetched } = city;
            // Convert milliseconds to minutes.
            const timeDifference = (now - timeFetched) / 1000 / 60;

            // Request weather update if fetched over 30 minutes ago.
            if (timeDifference > 30 || timeFetched === undefined) {
                this.props.fetchWeatherUpdate(city.id);
            }
        });
    }

    renderWeather(cityData) {

        const id = cityData.id;
        const name = cityData.name;
        const description = cityData.weather[0].description;
        const tempInC = Math.round(cityData.main.temp);
        const tempInF = Math.round(tempInC * 9 / 5 + 32);
        const humidity = cityData.main.humidity;
        const { lon, lat } = cityData.coord;
        const timeLastUpdated = moment.unix(cityData.dt).fromNow();

        return (
            <div className="row" key={id}>
                <div className="col-md-3">
                    <GoogleMap lat={lat} lon={lon} />
                    {name}
                </div>
                <div className="weather-info-text">

                    <div className="col-md-9 col-xs-12">
                        ({description})
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <Chart data={tempInC} units="C" />
                        <Chart data={tempInF} units="F" />
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <Chart data={humidity} units="%" label="Humidity" /><br />
                        <i>updated {timeLastUpdated}</i>
                    </div>
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

export default connect(mapStateToProps, { fetchWeatherFromLocalStorage, fetchWeatherUpdate })(WeatherList)
