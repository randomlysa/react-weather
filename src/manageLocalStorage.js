// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('weather');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined;
    }
}

export const saveState = (weather) => {
    try {
        const serializedState = JSON.stringify(weather);
        localStorage.setItem('weather', serializedState);
    } catch (err) {
        // Ignore write errors.
    }
}