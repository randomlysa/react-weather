import React from 'react';
import styled from 'styled-components';

const WeatherData = styled.span`
  padding-left: 20px;

  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

// Used to display C / F / Humidity
export default props => {
  return (
    <WeatherData>
      {props.data} {props.units} {props.label}
    </WeatherData>
  );
};
