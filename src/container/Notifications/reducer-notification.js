import { NOTIFICATION } from '../Cities/actions-weather';

export default function(state = [], action) {
  switch (action.type) {
    case NOTIFICATION:
      return action.payload;
  }
  // Clear the notification.
  return state;
}
