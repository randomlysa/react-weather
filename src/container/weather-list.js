import React, { Component } from 'react';
import Chart from '../components/chart'
import GoogleMap from '../components/google-map';

// Gets weather from state.
import { connect } from 'react-redux';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const tempsInK = cityData.list.map(weather => weather.main.temp);
        const tempsInC = tempsInK.map(temp => temp - 273.15);
        const tempsInF = tempsInC.map(temp => temp * 9 / 5 + 32)
        const humidity = cityData.list.map(weather => weather.main.humidity);
        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={name}>
                <td>
                    <GoogleMap lat={lat} lon={lon} />
                </td>
                <td><Chart data={tempsInC} type="temp" color="blue" units="C" /></td>
                <td><Chart data={tempsInF} type="temp" color="blue" units="F" /></td>
                <td><Chart data={humidity} color="black" units="%" /></td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (C)</th>
                        <th>Temperature (F)</th>
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
function mapStateToProps({ weather }) { // same as state.weather
    return { weather }; // same as { weather: weather}
}

export default connect(mapStateToProps)(WeatherList)
