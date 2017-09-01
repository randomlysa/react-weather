import {
    FETCH_WEATHER_FROM_LOCALSTORAGE,
    FETCH_WEATHER_FROM_OPENWEATHER,
    FETCH_WEATHER_UPDATE
} from '../actions/index';
import _ from 'lodash'

export default function(state = [], action) {
    const now = new Date().getTime();

    switch (action.type) {
        case FETCH_WEATHER_FROM_LOCALSTORAGE:
            return action.payload
        case FETCH_WEATHER_FROM_OPENWEATHER:
            action.payload.data.timeFetched = now;
           return [ action.payload.data, ...state]
        case FETCH_WEATHER_UPDATE:
            // Find where the cityToUpdate is in the state.
            const cityToUpdate = _.findKey(state, {id: action.payload.data.id} );
            // Remove old city and add cityToUpdate
            action.payload.data.timeFetched = now;
            state.splice(cityToUpdate, 1, action.payload.data);
            return [ ...state ]
    }
    return state;
}