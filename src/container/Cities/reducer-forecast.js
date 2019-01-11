import {
  FETCH_FORECAST_FROM_OPENWEATHER,
  FETCH_FORECAST_FROM_LOCALSTORAGE,
  DELETE_ONE_FORECAST
} from './actions-forecast';

import { loadState, saveState } from '../../helpers/manage-localStorage';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_FORECAST_FROM_OPENWEATHER:
      // Want data.city.id, data.list
      const cityId = action.payload.data.city.id;
      const newState = { ...state, [cityId]: action.payload.data.list };
      saveState('weather_forecast', newState);
      return newState;

    case FETCH_FORECAST_FROM_LOCALSTORAGE:
      return action.payload;

    case DELETE_ONE_FORECAST:
      // https://stackoverflow.com/a/47227198/3996097
      const { [action.payload]: value, ...withoutId } = state;
      saveState('weather_forecast', withoutId);
      return withoutId;
  }
  return state;
}
