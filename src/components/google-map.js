import React, { Component } from 'react';
import styled from 'styled-components';

const Map = styled.div`
  text-align: center;
  height: 200px;
  width: 100%;
`;

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
    return <Map ref="map" className="google-map-div" />;
  }
}

export default GoogleMap;
