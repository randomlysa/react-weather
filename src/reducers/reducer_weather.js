import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_WEATHER:
            // push adds elements to an array (mutate) - Don't Do this!!!
            // concat returns a new array. this is good. lines 8-9 are the same.
            // return state.concat([ action.payload.data ]);
            return [ action.payload.data, ...state]
    }
    return state;
}