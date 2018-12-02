## Project Info

Lookup weather from Openweathermap.

<strong>Displays</strong>

- Typeahead suggestions and search/filter by country (add comma, two letter country code. Example: `Ro, UA`)
- Google maps location of city
- Temperature in C/F
- Humidity
- Rain/snow/etc.
- Time of last update for each city (from Openweather).
- Time of last update check.

<strong>Features</strong>

- On load, update cities that have weather fetched more than 30 minutes ago.
- Caches to localstorage.

Thanks to [local-reverse-geocoder](https://github.com/tomayac/local-reverse-geocoder) - was used to add a general area to OpenWeather's database. Very useful when two cities have the same name.

Latest version available at http://code.randomlysa.com/weather

## How to

### Run the project

- Download/clone the project and cd into the directory.
- Run `npm install` to install dependencies.
- Run `npm start` to start the webpack dev server.
- Open `localhost:8080` to view the project.
- Requires Apache/PHP for typeahead.
