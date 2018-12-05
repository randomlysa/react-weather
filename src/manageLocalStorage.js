// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export const loadState = (which = 'weather') => {
  try {
    let stateToReturn;
    // By default, return weather.
    if (which === 'weather') {
      stateToReturn = localStorage.getItem('weather');
      if (stateToReturn === null) {
        return undefined;
      }
    } else if (which === 'settings') {
      stateToReturn = localStorage.getItem('weather_settings');
    }

    return JSON.parse(stateToReturn);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (weather, settings) => {
  try {
    if (weather) {
      const serializedState = JSON.stringify(weather);
      localStorage.setItem('weather', serializedState);
    }

    if (settings) {
      const serializedSettings = JSON.stringify(settings);
      localStorage.setItem('weather_settings', serializedSettings);
    }
  } catch (err) {
    // Ignore write errors.
  }
};

export const clearStorage = () => {
  try {
    localStorage.setItem('weather', '');
    window.location.reload(true);
  } catch (err) {
    console.log(err);
  }
};
