import React from 'react';
import styled from 'styled-components';

const WeatherTemp = styled.span`
  padding-left: 20px;
`;

// Function based component, doesn't need state.
export default props => {
  return (
    <WeatherTemp>
      {props.data} {props.units} {props.label}
    </WeatherTemp>
  );
};
