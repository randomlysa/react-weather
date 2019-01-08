import React from 'react';
import styled from 'styled-components';

const WeatherData = styled.span`
  padding-left: 20px;
`;

// Used to display C / F / Humidity
export default props => {
  return (
    <WeatherData>
      {props.data} {props.units} {props.label}
    </WeatherData>
  );
};
