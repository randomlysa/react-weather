import {
    FETCH_WEATHER_FROM_LOCALSTORAGE,
    FETCH_WEATHER_FROM_OPENWEATHER,
    FETCH_WEATHER_UPDATE,

    DELETE_ONE_CITY
} from '../actions/index';
import _ from 'lodash'

export default function(state = [], action) {
    const now = new Date().getTime();

    switch (action.type) {
        case FETCH_WEATHER_FROM_LOCALSTORAGE:
            return action.payload
        case FETCH_WEATHER_FROM_OPENWEATHER:
            // Copy payload.data (new city) to new object.
            let newCityObject = Object.assign({}, action.payload.data);
            newCityObject.timeFetched = now;
           return [ newCityObject, ...state]
        case FETCH_WEATHER_UPDATE:
            if(action.payload) {
                // Find where the cityToUpdate is in the state.
                const cityToUpdate = _.findKey(state, {id: action.payload.data.id} );
                // Copy payload.data (new city) to new object.
                let updateCityObject = Object.assign({}, action.payload.data);
                updateCityObject.timeFetched = now;
                // Update state.
                state.splice(cityToUpdate, 1, updateCityObject);
                return [ ...state ]
            }
        case DELETE_ONE_CITY:
            // Find where the cityToDelete is in the state.
            const cityToDelete = _.findKey(
                state, {'id': parseInt(action.payload)}
            );

            state.splice(cityToDelete, 1);
            return [ ...state ];
    }
    return state;
}