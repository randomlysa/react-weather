import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const ForecastData = styled.span``;
const WeatherForDay = styled.span`
  padding-right: 20px;
`;

/*
Todo:
  - better formatting
  - display in C and F
*/

// Used to display 5 day forecast
export default props => {
  if (!props.data) return '';

  // Object with key yyyy_mm_dd : [array, of, temps, for, the, day]
  const allTempsForDay = {};
  props.data.forEach(day => {
    const dayOfWeek = day.dt_txt.split(' ')[0];
    if (!allTempsForDay[dayOfWeek]) {
      allTempsForDay[dayOfWeek] = [];
    }
    allTempsForDay[dayOfWeek].push(day.main.temp);
  });

  Object.keys(allTempsForDay).forEach(key => {
    allTempsForDay[key].sort((a, b) => a - b);
  });

  // Take array of temps for one day and display the first and last items
  // from the array - they are sorted already so this will be the low/high.
  const renderHighLowForDay = (key, temps) => {
    const dayOfWeek = moment(key).format('ddd');
    const today = moment().format('YYYY-MM-DD');

    // Skip today since full data isn't available for current day.
    if (today === key) return null;

    return (
      <WeatherForDay key={key}>
        {dayOfWeek} {temps[0]} / {temps[temps.length - 1]}
      </WeatherForDay>
    );
  };

  return (
    <ForecastData>
      {Object.keys(allTempsForDay).map(key => {
        return renderHighLowForDay(key, allTempsForDay[key]);
      })}
    </ForecastData>
  );
};
