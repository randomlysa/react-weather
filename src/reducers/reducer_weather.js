import { FETCH_WEATHER_FROM_LOCALSTORAGE, FETCH_WEATHER_FROM_OPENWEATHER } from '../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_WEATHER_FROM_LOCALSTORAGE:
            return action.payload
        case FETCH_WEATHER_FROM_OPENWEATHER:
           return [ action.payload.data, ...state]
    }
    return state;
}