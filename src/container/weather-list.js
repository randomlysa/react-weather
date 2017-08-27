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

        console.log(cityData)

        const id = cityData.id;
        const name = cityData.name;
        const tempsInK = Math.round(cityData.main.temp);
        console.log(tempsInK - 273);
        const tempsInC = tempsInK- 273;
        const tempsInF = Math.round(tempsInC * 9 / 5 + 32);
        const humidity = cityData.main.humidity;
        const { lon, lat } = cityData.coord;

        return (
            <tr key={id}>
                <td>
                    <GoogleMap lat={lat} lon={lon} />
                    {/* {name} */}
                </td>
                <td>
                    <Chart data={tempsInC} units="C" />
                    <Chart data={tempsInF} units="F" />
                </td>
                <td><Chart data={humidity} units="%" /></td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temp</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

// Gets weather from state.
function mapStateToProps({ weather }) {
    return { weather }; // same as { weather: weather}
}

export default connect(mapStateToProps, { fetchWeatherFromLocalStorage })(WeatherList)
