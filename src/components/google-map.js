import React, { Component } from 'react';

class GoogleMap extends Component {
  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: {
        lat: this.props.lat,
        lng: this.props.lon
      },
      disableDefaultUI: true
    });
  }

  render() {
    // this.refs.map refers to this element
    return <div ref="map" className="google-map-div" />;
  }
}

export default GoogleMap;
