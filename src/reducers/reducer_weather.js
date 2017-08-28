import {
    FETCH_WEATHER_FROM_LOCALSTORAGE,
    FETCH_WEATHER_FROM_OPENWEATHER,
    FETCH_WEATHER_UPDATE
} from '../actions/index';
import _ from 'lodash'

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_WEATHER_FROM_LOCALSTORAGE:
            return action.payload
        case FETCH_WEATHER_FROM_OPENWEATHER:
           return [ action.payload.data, ...state]
        case FETCH_WEATHER_UPDATE:
            // Find where the cityToUpdate is in the state.
            const cityToUpdate = _.findKey(state, {id: action.payload.data.id} );
            // Remove old city and add cityToUpdate
            state.splice(cityToUpdate, 1, action.payload.data);
            return [ ...state ]
    }
    return state;
}