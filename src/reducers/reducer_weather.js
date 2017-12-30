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
                let updatedCity = action.payload.data;
                updatedCity.timeFetched = now;

                // Return state with updatedCity.
                return state.map(city => {
                    if(city.id !== action.payload.data.id) {
                        return city;
                    }

                    return updatedCity;
                });
            } // if(action.payload)
        case DELETE_ONE_CITY:
            if (action.payload) {
                return _.reject(state, {'id': parseInt(action.payload)});
            }
    }
    return state;
}
