import React from 'react';
import styled from 'styled-components';

const Map = styled.div`
  text-align: center;
  padding-bottom: 1rem;
`;

// https://stackoverflow.com/a/52943975
export default props => {
  const url = `https://www.google.com/maps/search/?api=1&query=${props.lat},${
    props.lon
  }`;
  return (
    <Map>
      <a href={url} target="_blank">
        Map »
      </a>
    </Map>
  );
};
