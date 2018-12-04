import { SET_CITY_LIST } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case SET_CITY_LIST:
      return action.payload;
  }
  return state;
}
