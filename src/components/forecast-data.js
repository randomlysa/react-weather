import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const ForecastData = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const WeatherForDay = styled.div``;

const Header = styled.div``;
const TempC = styled.div``;
const TempF = styled.div``;

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

  // Sort temps from low to high.
  Object.keys(allTempsForDay).forEach(key => {
    allTempsForDay[key].sort((a, b) => a - b);
  });

  // Take array of temps for one day and display the first and last items
  // from the array - they are sorted already so this will be the low/high.
  const renderHighLowForDay = (key, temps) => {
    const dayOfWeek = moment(key).format('ddd');
    const today = moment().format('YYYY-MM-DD');

    const lowTemp = temps[0];
    const highTemp = temps[temps.length - 1];

    const lowTempC = Math.round(lowTemp);
    const highTempC = Math.round(highTemp);

    const lowTempF = Math.round((lowTemp * 9) / 5 + 32);
    const highTempF = Math.round((highTemp * 9) / 5 + 32);

    // Skip today since full data isn't available for current day.
    if (today === key) return null;

    return (
      <WeatherForDay key={key} className="THE_WEATHER">
        <Header>{dayOfWeek}</Header>
        <TempC>
          {lowTempC} / {highTempC}
        </TempC>
        <TempF>
          {lowTempF} / {highTempF}
        </TempF>
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
