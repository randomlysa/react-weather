import React, { Component } from 'react';
import Chart from '../components/chart'
import GoogleMap from '../components/google-map';

// Gets weather from state.
import { connect } from 'react-redux';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const humidity = cityData.list.map(weather => weather.main.humidity);
        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={name}>
                <td>
                    <GoogleMap lat={lat} lon={lon} />
                </td>
                <td><Chart data={temps} type="temp" color="blue" units="K" /></td>
                <td><Chart data={humidity} color="black" units="%" /></td>
                <td><Chart data={pressure} color="green" units="hPa" /></td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City/Cities</th>
                        <th>Temperature (K)</th>
                        <th>Humidity (%)</th>
                        <th>Pressure</th>
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
