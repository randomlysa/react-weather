import {
    ERROR_FETCHING_NEW_LOCATION
} from '../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case ERROR_FETCHING_NEW_LOCATION:
            return action.message;
    }
    // Clear the error message.
    return '';
}
