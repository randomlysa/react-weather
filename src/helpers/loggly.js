import axios from 'axios';
import { LOGGLY_URL } from './config.js';

// 'react-weather' in the url is a tag. it can be changed to anything without
// needing to do any setup here or on Loggly.
const logError = data => {
  console.log(data);
  axios({
    headers: {
      'content-type': 'text/plain'
    },
    method: 'post',
    url: `${LOGGLY_URL}/react-weather/`,
    data: {
      message: data
    }
  });
};

export { logError };
