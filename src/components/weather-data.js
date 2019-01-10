import React from 'react';
import styled from 'styled-components';

const WeatherData = styled.span`
  padding-left: 20px;
  font-size: ${props => (props.label ? '1.3rem' : '2rem')};

  @media (min-width: 768px) {
    font-size: ${props => (props.label ? '1.3rem' : '5rem')};
  }
`;

// Used to display C / F / Humidity
export default props => {
  // Only humidity has a label. Keep font size of 1.3 for humidity
  // but change font-size of temp based on screen size.
  // Also put a space between number and C/F but not between number
  // and % humidity. (1 C  34F  35% humidity)
  return (
    <WeatherData label={props.label}>
      {props.data}
      {!props.label && ' '}
      {props.units} {props.label}
    </WeatherData>
  );
};
