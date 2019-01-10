import {
  FETCH_FORECAST_FROM_OPENWEATHER,
  FETCH_FORECAST_FROM_LOCALSTORAGE
} from './actions-forecast';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_FORECAST_FROM_OPENWEATHER:
      // Want data.city.id, data.list
      const cityId = action.payload.data.city.id;
      return { ...state, [cityId]: action.payload.data.list };
  }
  return state;
}
