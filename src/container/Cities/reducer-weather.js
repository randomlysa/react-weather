import {
  FETCH_WEATHER_FROM_LOCALSTORAGE,
  FETCH_WEATHER_FROM_OPENWEATHER,
  FETCH_WEATHER_UPDATE,
  DELETE_ONE_CITY
} from './actions-weather';
import reject from 'lodash/reject';

export default function(state = [], action) {
  const now = new Date().getTime();

  switch (action.type) {
    case FETCH_WEATHER_FROM_LOCALSTORAGE:
      return action.payload;
    case FETCH_WEATHER_FROM_OPENWEATHER:
      // Copy payload.data (new city) to new object.
      if (typeof action.payload.data === 'object') {
        const cityWithTimeFetched = {
          ...action.payload.data,
          timeFetched: now
        };
        return [cityWithTimeFetched, ...state];
      } else {
        return state;
      }

    case FETCH_WEATHER_UPDATE:
      if (action.payload) {
        let updatedCity = action.payload.data;
        updatedCity.timeFetched = now;

        // Return state with updatedCity.
        return state.map(city => {
          if (city.id !== action.payload.data.id) {
            return city;
          }

          return updatedCity;
        });
      } // if(action.payload)
    case DELETE_ONE_CITY:
      if (action.payload) {
        return reject(state, { id: parseInt(action.payload) });
      }
  }
  return state;
}
