// Note, this is very dummy data - weather1 and forecast1 ids and names match up, but not coords or anything else.

export const weather1 = {
  coord: { lon: -122.09, lat: 37.39 },
  sys: {
    type: 3,
    id: 168940,
    message: 0.0297,
    country: 'US',
    sunrise: 1427723751,
    sunset: 1427768967
  },
  weather: [
    { id: 800, main: 'Clear', description: 'Sky is Clear', icon: '01n' }
  ],
  base: 'stations',
  main: {
    temp: 285.68,
    humidity: 74,
    pressure: 1016.8,
    temp_min: 284.82,
    temp_max: 286.48
  },
  wind: { speed: 0.96, deg: 285.001 },
  clouds: { all: 0 },
  dt: 1427700245,
  id: 0,
  name: 'Mountain View',
  cod: 200,
  timeFetched: 0
};

const weather2 = {
  coord: { lon: 139, lat: 35 },
  sys: { country: 'JP', sunrise: 1369769524, sunset: 1369821049 },
  weather: [
    { id: 804, main: 'clouds', description: 'overcast clouds', icon: '04n' }
  ],
  main: {
    temp: 289.5,
    humidity: 89,
    pressure: 1013,
    temp_min: 287.04,
    temp_max: 292.04
  },
  wind: { speed: 7.31, deg: 187.002 },
  rain: { '3h': 0 },
  clouds: { all: 92 },
  dt: 1369824698,
  id: 1851632,
  name: 'Shuzenji',
  cod: 200
};

export const forecast1 = {
  cod: '200',
  message: 0.0036,
  cnt: 40,
  list: [
    {
      dt: 1485799200,
      main: {
        temp: 261.45,
        temp_min: 259.086,
        temp_max: 261.45,
        pressure: 1023.48,
        sea_level: 1045.39,
        grnd_level: 1023.48,
        humidity: 79,
        temp_kf: 2.37
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '02n' }
      ],
      clouds: { all: 8 },
      wind: { speed: 4.77, deg: 232.505 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-01-30 18:00:00'
    },
    {
      dt: 1485810000,
      main: {
        temp: 261.41,
        temp_min: 259.638,
        temp_max: 261.41,
        pressure: 1022.41,
        sea_level: 1044.35,
        grnd_level: 1022.41,
        humidity: 76,
        temp_kf: 1.78
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 32 },
      wind: { speed: 4.76, deg: 240.503 },
      snow: { '3h': 0.011 },
      sys: { pod: 'n' },
      dt_txt: '2017-01-30 21:00:00'
    },
    {
      dt: 1485820800,
      main: {
        temp: 261.76,
        temp_min: 260.571,
        temp_max: 261.76,
        pressure: 1021.34,
        sea_level: 1043.21,
        grnd_level: 1021.34,
        humidity: 84,
        temp_kf: 1.18
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 68 },
      wind: { speed: 4.71, deg: 243 },
      snow: { '3h': 0.058 },
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 00:00:00'
    },
    {
      dt: 1485831600,
      main: {
        temp: 261.46,
        temp_min: 260.865,
        temp_max: 261.46,
        pressure: 1019.95,
        sea_level: 1041.79,
        grnd_level: 1019.95,
        humidity: 82,
        temp_kf: 0.59
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 68 },
      wind: { speed: 4.46, deg: 244.5 },
      snow: { '3h': 0.05225 },
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 03:00:00'
    },
    {
      dt: 1485842400,
      main: {
        temp: 260.981,
        temp_min: 260.981,
        temp_max: 260.981,
        pressure: 1018.96,
        sea_level: 1040.84,
        grnd_level: 1018.96,
        humidity: 81,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }
      ],
      clouds: { all: 80 },
      wind: { speed: 4.21, deg: 245.005 },
      snow: { '3h': 0.19625 },
      sys: { pod: 'd' },
      dt_txt: '2017-01-31 06:00:00'
    },
    {
      dt: 1485853200,
      main: {
        temp: 262.308,
        temp_min: 262.308,
        temp_max: 262.308,
        pressure: 1018.1,
        sea_level: 1039.77,
        grnd_level: 1018.1,
        humidity: 91,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }
      ],
      clouds: { all: 88 },
      wind: { speed: 4.1, deg: 249.006 },
      snow: { '3h': 0.535 },
      sys: { pod: 'd' },
      dt_txt: '2017-01-31 09:00:00'
    },
    {
      dt: 1485864000,
      main: {
        temp: 263.76,
        temp_min: 263.76,
        temp_max: 263.76,
        pressure: 1016.86,
        sea_level: 1038.4,
        grnd_level: 1016.86,
        humidity: 87,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }
      ],
      clouds: { all: 68 },
      wind: { speed: 3.87, deg: 254.5 },
      snow: { '3h': 0.21 },
      sys: { pod: 'd' },
      dt_txt: '2017-01-31 12:00:00'
    },
    {
      dt: 1485874800,
      main: {
        temp: 264.182,
        temp_min: 264.182,
        temp_max: 264.182,
        pressure: 1016.19,
        sea_level: 1037.77,
        grnd_level: 1016.19,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 76 },
      wind: { speed: 3.67, deg: 257.001 },
      snow: { '3h': 0.1375 },
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 15:00:00'
    },
    {
      dt: 1485885600,
      main: {
        temp: 264.67,
        temp_min: 264.67,
        temp_max: 264.67,
        pressure: 1015.32,
        sea_level: 1036.94,
        grnd_level: 1015.32,
        humidity: 86,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 88 },
      wind: { speed: 3.61, deg: 262.503 },
      snow: { '3h': 0.1425 },
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 18:00:00'
    },
    {
      dt: 1485896400,
      main: {
        temp: 265.436,
        temp_min: 265.436,
        temp_max: 265.436,
        pressure: 1014.27,
        sea_level: 1035.76,
        grnd_level: 1014.27,
        humidity: 90,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 80 },
      wind: { speed: 3.67, deg: 266.5 },
      snow: { '3h': 0.1625 },
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 21:00:00'
    },
    {
      dt: 1485907200,
      main: {
        temp: 266.104,
        temp_min: 266.104,
        temp_max: 266.104,
        pressure: 1013.1,
        sea_level: 1034.62,
        grnd_level: 1013.1,
        humidity: 90,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 80 },
      wind: { speed: 3.81, deg: 269.004 },
      snow: { '3h': 0.1025 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 00:00:00'
    },
    {
      dt: 1485918000,
      main: {
        temp: 266.904,
        temp_min: 266.904,
        temp_max: 266.904,
        pressure: 1011.96,
        sea_level: 1033.47,
        grnd_level: 1011.96,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 76 },
      wind: { speed: 4.26, deg: 274.002 },
      snow: { '3h': 0.12 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 03:00:00'
    },
    {
      dt: 1485928800,
      main: {
        temp: 268.102,
        temp_min: 268.102,
        temp_max: 268.102,
        pressure: 1011.23,
        sea_level: 1032.62,
        grnd_level: 1011.23,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }
      ],
      clouds: { all: 76 },
      wind: { speed: 4.4, deg: 283.501 },
      snow: { '3h': 0.13 },
      sys: { pod: 'd' },
      dt_txt: '2017-02-01 06:00:00'
    },
    {
      dt: 1485939600,
      main: {
        temp: 270.269,
        temp_min: 270.269,
        temp_max: 270.269,
        pressure: 1010.85,
        sea_level: 1032.1,
        grnd_level: 1010.85,
        humidity: 92,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }
      ],
      clouds: { all: 64 },
      wind: { speed: 4.53, deg: 297.5 },
      snow: { '3h': 0.1875 },
      sys: { pod: 'd' },
      dt_txt: '2017-02-01 09:00:00'
    },
    {
      dt: 1485950400,
      main: {
        temp: 270.585,
        temp_min: 270.585,
        temp_max: 270.585,
        pressure: 1010.49,
        sea_level: 1031.65,
        grnd_level: 1010.49,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }
      ],
      clouds: { all: 76 },
      wind: { speed: 4.31, deg: 302.004 },
      snow: { '3h': 0.065 },
      sys: { pod: 'd' },
      dt_txt: '2017-02-01 12:00:00'
    },
    {
      dt: 1485961200,
      main: {
        temp: 269.661,
        temp_min: 269.661,
        temp_max: 269.661,
        pressure: 1010.22,
        sea_level: 1031.49,
        grnd_level: 1010.22,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 68 },
      wind: { speed: 4.91, deg: 296.5 },
      snow: { '3h': 0.0825 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 15:00:00'
    },
    {
      dt: 1485972000,
      main: {
        temp: 269.155,
        temp_min: 269.155,
        temp_max: 269.155,
        pressure: 1009.95,
        sea_level: 1031.3,
        grnd_level: 1009.95,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 80 },
      wind: { speed: 5.7, deg: 310.501 },
      snow: { '3h': 0.11 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 18:00:00'
    },
    {
      dt: 1485982800,
      main: {
        temp: 268.056,
        temp_min: 268.056,
        temp_max: 268.056,
        pressure: 1011.21,
        sea_level: 1032.49,
        grnd_level: 1011.21,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 68 },
      wind: { speed: 5.56, deg: 333 },
      snow: { '3h': 0.225 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 21:00:00'
    },
    {
      dt: 1485993600,
      main: {
        temp: 265.803,
        temp_min: 265.803,
        temp_max: 265.803,
        pressure: 1013.79,
        sea_level: 1035.06,
        grnd_level: 1013.79,
        humidity: 83,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13n' }
      ],
      clouds: { all: 8 },
      wind: { speed: 4.8, deg: 355.004 },
      snow: { '3h': 0.03 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 00:00:00'
    },
    {
      dt: 1486004400,
      main: {
        temp: 263.381,
        temp_min: 263.381,
        temp_max: 263.381,
        pressure: 1015.66,
        sea_level: 1037.16,
        grnd_level: 1015.66,
        humidity: 84,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 4.2, deg: 348.503 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 03:00:00'
    },
    {
      dt: 1486015200,
      main: {
        temp: 261.85,
        temp_min: 261.85,
        temp_max: 261.85,
        pressure: 1017.63,
        sea_level: 1039.22,
        grnd_level: 1017.63,
        humidity: 76,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.81, deg: 345.502 },
      snow: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-02 06:00:00'
    },
    {
      dt: 1486026000,
      main: {
        temp: 263.455,
        temp_min: 263.455,
        temp_max: 263.455,
        pressure: 1019.32,
        sea_level: 1040.84,
        grnd_level: 1019.32,
        humidity: 84,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.06, deg: 344.004 },
      snow: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-02 09:00:00'
    },
    {
      dt: 1486036800,
      main: {
        temp: 264.015,
        temp_min: 264.015,
        temp_max: 264.015,
        pressure: 1020.41,
        sea_level: 1041.88,
        grnd_level: 1020.41,
        humidity: 85,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 2.52, deg: 334.501 },
      snow: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-02 12:00:00'
    },
    {
      dt: 1486047600,
      main: {
        temp: 259.684,
        temp_min: 259.684,
        temp_max: 259.684,
        pressure: 1021.52,
        sea_level: 1043.21,
        grnd_level: 1021.52,
        humidity: 76,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 2.48, deg: 320.501 },
      snow: { '3h': 0.0024999999999999 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 15:00:00'
    },
    {
      dt: 1486058400,
      main: {
        temp: 255.188,
        temp_min: 255.188,
        temp_max: 255.188,
        pressure: 1022.09,
        sea_level: 1044.09,
        grnd_level: 1022.09,
        humidity: 66,
        temp_kf: 0
      },
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' }
      ],
      clouds: { all: 24 },
      wind: { speed: 1.23, deg: 283.003 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 18:00:00'
    },
    {
      dt: 1486069200,
      main: {
        temp: 255.594,
        temp_min: 255.594,
        temp_max: 255.594,
        pressure: 1022.03,
        sea_level: 1044.12,
        grnd_level: 1022.03,
        humidity: 64,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: { all: 48 },
      wind: { speed: 1.22, deg: 244.502 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 21:00:00'
    },
    {
      dt: 1486080000,
      main: {
        temp: 256.96,
        temp_min: 256.96,
        temp_max: 256.96,
        pressure: 1021.8,
        sea_level: 1043.77,
        grnd_level: 1021.8,
        humidity: 66,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: { all: 44 },
      wind: { speed: 1.23, deg: 237.506 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 00:00:00'
    },
    {
      dt: 1486090800,
      main: {
        temp: 258.109,
        temp_min: 258.109,
        temp_max: 258.109,
        pressure: 1020.97,
        sea_level: 1042.99,
        grnd_level: 1020.97,
        humidity: 77,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }
      ],
      clouds: { all: 80 },
      wind: { speed: 1.21, deg: 234.502 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 03:00:00'
    },
    {
      dt: 1486101600,
      main: {
        temp: 259.533,
        temp_min: 259.533,
        temp_max: 259.533,
        pressure: 1020.56,
        sea_level: 1042.53,
        grnd_level: 1020.56,
        humidity: 76,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }
      ],
      clouds: { all: 68 },
      wind: { speed: 1.21, deg: 229.509 },
      snow: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-03 06:00:00'
    },
    {
      dt: 1486112400,
      main: {
        temp: 263.438,
        temp_min: 263.438,
        temp_max: 263.438,
        pressure: 1020.46,
        sea_level: 1042.15,
        grnd_level: 1020.46,
        humidity: 84,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }
      ],
      clouds: { all: 56 },
      wind: { speed: 1.51, deg: 242.503 },
      snow: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-03 09:00:00'
    },
    {
      dt: 1486123200,
      main: {
        temp: 264.228,
        temp_min: 264.228,
        temp_max: 264.228,
        pressure: 1019.58,
        sea_level: 1041.24,
        grnd_level: 1019.58,
        humidity: 89,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }
      ],
      clouds: { all: 56 },
      wind: { speed: 1.58, deg: 242.503 },
      snow: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-03 12:00:00'
    },
    {
      dt: 1486134000,
      main: {
        temp: 261.153,
        temp_min: 261.153,
        temp_max: 261.153,
        pressure: 1019.63,
        sea_level: 1041.42,
        grnd_level: 1019.63,
        humidity: 80,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 76 },
      wind: { speed: 1.21, deg: 198.501 },
      snow: { '3h': 0.0049999999999999 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 15:00:00'
    },
    {
      dt: 1486144800,
      main: {
        temp: 258.818,
        temp_min: 258.818,
        temp_max: 258.818,
        pressure: 1020.18,
        sea_level: 1042.03,
        grnd_level: 1020.18,
        humidity: 73,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }
      ],
      clouds: { all: 64 },
      wind: { speed: 1.21, deg: 209.002 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 18:00:00'
    },
    {
      dt: 1486155600,
      main: {
        temp: 257.218,
        temp_min: 257.218,
        temp_max: 257.218,
        pressure: 1020.43,
        sea_level: 1042.38,
        grnd_level: 1020.43,
        humidity: 65,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: { all: 44 },
      wind: { speed: 1.17, deg: 194.501 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 21:00:00'
    },
    {
      dt: 1486166400,
      main: {
        temp: 255.782,
        temp_min: 255.782,
        temp_max: 255.782,
        pressure: 1020.57,
        sea_level: 1042.75,
        grnd_level: 1020.57,
        humidity: 73,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }
      ],
      clouds: { all: 56 },
      wind: { speed: 1.21, deg: 175.001 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-04 00:00:00'
    },
    {
      dt: 1486177200,
      main: {
        temp: 254.819,
        temp_min: 254.819,
        temp_max: 254.819,
        pressure: 1020.99,
        sea_level: 1043.11,
        grnd_level: 1020.99,
        humidity: 68,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 44 },
      wind: { speed: 1.22, deg: 122.001 },
      snow: { '3h': 0.0049999999999999 },
      sys: { pod: 'n' },
      dt_txt: '2017-02-04 03:00:00'
    },
    {
      dt: 1486188000,
      main: {
        temp: 257.488,
        temp_min: 257.488,
        temp_max: 257.488,
        pressure: 1021.31,
        sea_level: 1043.48,
        grnd_level: 1021.31,
        humidity: 63,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }
      ],
      clouds: { all: 68 },
      wind: { speed: 2.13, deg: 155.501 },
      snow: { '3h': 0.04 },
      sys: { pod: 'd' },
      dt_txt: '2017-02-04 06:00:00'
    },
    {
      dt: 1486198800,
      main: {
        temp: 259.827,
        temp_min: 259.827,
        temp_max: 259.827,
        pressure: 1021.81,
        sea_level: 1043.67,
        grnd_level: 1021.81,
        humidity: 90,
        temp_kf: 0
      },
      weather: [
        { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }
      ],
      clouds: { all: 68 },
      wind: { speed: 2.07, deg: 170.005 },
      snow: { '3h': 0.03 },
      sys: { pod: 'd' },
      dt_txt: '2017-02-04 09:00:00'
    },
    {
      dt: 1486209600,
      main: {
        temp: 261.256,
        temp_min: 261.256,
        temp_max: 261.256,
        pressure: 1021.31,
        sea_level: 1043.05,
        grnd_level: 1021.31,
        humidity: 86,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 76 },
      wind: { speed: 2.32, deg: 175.001 },
      snow: { '3h': 0.0049999999999999 },
      sys: { pod: 'd' },
      dt_txt: '2017-02-04 12:00:00'
    },
    {
      dt: 1486220400,
      main: {
        temp: 260.26,
        temp_min: 260.26,
        temp_max: 260.26,
        pressure: 1021,
        sea_level: 1042.96,
        grnd_level: 1021,
        humidity: 86,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }
      ],
      clouds: { all: 56 },
      wind: { speed: 2.47, deg: 180.501 },
      snow: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-04 15:00:00'
    }
  ],
  city: {
    id: 168940,
    name: 'Mountain View',
    coord: { lat: 55.7522, lon: 37.6156 },
    country: 'none'
  }
};

export const forecast2 = {
  cod: '200',
  message: 0.0082,
  cnt: 40,
  list: [
    {
      dt: 1485799200,
      main: {
        temp: 283.76,
        temp_min: 283.76,
        temp_max: 283.761,
        pressure: 1017.24,
        sea_level: 1026.83,
        grnd_level: 1017.24,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 7.27, deg: 15.0048 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-01-30 18:00:00'
    },
    {
      dt: 1485810000,
      main: {
        temp: 282.56,
        temp_min: 282.56,
        temp_max: 282.563,
        pressure: 1020.06,
        sea_level: 1029.63,
        grnd_level: 1020.06,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 6.21, deg: 31.5035 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-01-30 21:00:00'
    },
    {
      dt: 1485820800,
      main: {
        temp: 282.3,
        temp_min: 282.296,
        temp_max: 282.3,
        pressure: 1022.71,
        sea_level: 1032.27,
        grnd_level: 1022.71,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 6.71, deg: 51.0002 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-01-31 00:00:00'
    },
    {
      dt: 1485831600,
      main: {
        temp: 282.27,
        temp_min: 282.265,
        temp_max: 282.27,
        pressure: 1023.68,
        sea_level: 1033.16,
        grnd_level: 1023.68,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 5.46, deg: 65.5 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-01-31 03:00:00'
    },
    {
      dt: 1485842400,
      main: {
        temp: 282.656,
        temp_min: 282.656,
        temp_max: 282.656,
        pressure: 1023.75,
        sea_level: 1033.22,
        grnd_level: 1023.75,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 4.11, deg: 84.0055 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-01-31 06:00:00'
    },
    {
      dt: 1485853200,
      main: {
        temp: 282.783,
        temp_min: 282.783,
        temp_max: 282.783,
        pressure: 1024.91,
        sea_level: 1034.46,
        grnd_level: 1024.91,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.6, deg: 89.0062 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 09:00:00'
    },
    {
      dt: 1485864000,
      main: {
        temp: 283.335,
        temp_min: 283.335,
        temp_max: 283.335,
        pressure: 1025.21,
        sea_level: 1034.83,
        grnd_level: 1025.21,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }
      ],
      clouds: { all: 68 },
      wind: { speed: 3.37, deg: 115 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 12:00:00'
    },
    {
      dt: 1485874800,
      main: {
        temp: 284.657,
        temp_min: 284.657,
        temp_max: 284.657,
        pressure: 1023.65,
        sea_level: 1033.43,
        grnd_level: 1023.65,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: { all: 36 },
      wind: { speed: 3.32, deg: 177.501 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 15:00:00'
    },
    {
      dt: 1485885600,
      main: {
        temp: 284.095,
        temp_min: 284.095,
        temp_max: 284.095,
        pressure: 1022.05,
        sea_level: 1031.79,
        grnd_level: 1022.05,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '02n' }
      ],
      clouds: { all: 8 },
      wind: { speed: 4.26, deg: 254.003 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 18:00:00'
    },
    {
      dt: 1485896400,
      main: {
        temp: 283.211,
        temp_min: 283.211,
        temp_max: 283.211,
        pressure: 1021.33,
        sea_level: 1031.06,
        grnd_level: 1021.33,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 4.32, deg: 271.5 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-01-31 21:00:00'
    },
    {
      dt: 1485907200,
      main: {
        temp: 284.179,
        temp_min: 284.179,
        temp_max: 284.179,
        pressure: 1020.57,
        sea_level: 1030.28,
        grnd_level: 1020.57,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }
      ],
      clouds: { all: 20 },
      wind: { speed: 10.16, deg: 256.504 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-01 00:00:00'
    },
    {
      dt: 1485918000,
      main: {
        temp: 284.829,
        temp_min: 284.829,
        temp_max: 284.829,
        pressure: 1017.39,
        sea_level: 1027.23,
        grnd_level: 1017.39,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '02d' }
      ],
      clouds: { all: 8 },
      wind: { speed: 13.76, deg: 259.502 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-01 03:00:00'
    },
    {
      dt: 1485928800,
      main: {
        temp: 285.702,
        temp_min: 285.702,
        temp_max: 285.702,
        pressure: 1014.64,
        sea_level: 1024.23,
        grnd_level: 1014.64,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }
      ],
      clouds: { all: 12 },
      wind: { speed: 12.75, deg: 264.001 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-01 06:00:00'
    },
    {
      dt: 1485939600,
      main: {
        temp: 285.494,
        temp_min: 285.494,
        temp_max: 285.494,
        pressure: 1014.1,
        sea_level: 1023.71,
        grnd_level: 1014.1,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 12.33, deg: 271.5 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 09:00:00'
    },
    {
      dt: 1485950400,
      main: {
        temp: 285.16,
        temp_min: 285.16,
        temp_max: 285.16,
        pressure: 1014.54,
        sea_level: 1024.27,
        grnd_level: 1014.54,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 12.21, deg: 278.504 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 12:00:00'
    },
    {
      dt: 1485961200,
      main: {
        temp: 284.161,
        temp_min: 284.161,
        temp_max: 284.161,
        pressure: 1016.13,
        sea_level: 1025.81,
        grnd_level: 1016.13,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 12.21, deg: 281 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 15:00:00'
    },
    {
      dt: 1485972000,
      main: {
        temp: 282.63,
        temp_min: 282.63,
        temp_max: 282.63,
        pressure: 1017.33,
        sea_level: 1027,
        grnd_level: 1017.33,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 9.3, deg: 297.001 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 18:00:00'
    },
    {
      dt: 1485982800,
      main: {
        temp: 281.856,
        temp_min: 281.856,
        temp_max: 281.856,
        pressure: 1018.51,
        sea_level: 1028.24,
        grnd_level: 1018.51,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 8.91, deg: 288 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-01 21:00:00'
    },
    {
      dt: 1485993600,
      main: {
        temp: 281.978,
        temp_min: 281.978,
        temp_max: 281.978,
        pressure: 1019.22,
        sea_level: 1028.89,
        grnd_level: 1019.22,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 9.15, deg: 286.504 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-02 00:00:00'
    },
    {
      dt: 1486004400,
      main: {
        temp: 283.706,
        temp_min: 283.706,
        temp_max: 283.706,
        pressure: 1017.36,
        sea_level: 1026.99,
        grnd_level: 1017.36,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 8.95, deg: 288.003 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-02 03:00:00'
    },
    {
      dt: 1486015200,
      main: {
        temp: 285.125,
        temp_min: 285.125,
        temp_max: 285.125,
        pressure: 1016.41,
        sea_level: 1026.05,
        grnd_level: 1016.41,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 7.56, deg: 294.002 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-02 06:00:00'
    },
    {
      dt: 1486026000,
      main: {
        temp: 284.755,
        temp_min: 284.755,
        temp_max: 284.755,
        pressure: 1018.18,
        sea_level: 1027.75,
        grnd_level: 1018.18,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 8.31, deg: 290.504 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 09:00:00'
    },
    {
      dt: 1486036800,
      main: {
        temp: 283.765,
        temp_min: 283.765,
        temp_max: 283.765,
        pressure: 1019.04,
        sea_level: 1028.51,
        grnd_level: 1019.04,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 8.87, deg: 283.001 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 12:00:00'
    },
    {
      dt: 1486047600,
      main: {
        temp: 283.809,
        temp_min: 283.809,
        temp_max: 283.809,
        pressure: 1018.6,
        sea_level: 1028.26,
        grnd_level: 1018.6,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 8.73, deg: 281.001 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 15:00:00'
    },
    {
      dt: 1486058400,
      main: {
        temp: 283.788,
        temp_min: 283.788,
        temp_max: 283.788,
        pressure: 1018.68,
        sea_level: 1028.33,
        grnd_level: 1018.68,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 7.8, deg: 281.503 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 18:00:00'
    },
    {
      dt: 1486069200,
      main: {
        temp: 283.569,
        temp_min: 283.569,
        temp_max: 283.569,
        pressure: 1019.28,
        sea_level: 1028.92,
        grnd_level: 1019.28,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 5.92, deg: 284.002 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-02 21:00:00'
    },
    {
      dt: 1486080000,
      main: {
        temp: 284.11,
        temp_min: 284.11,
        temp_max: 284.11,
        pressure: 1020.75,
        sea_level: 1030.35,
        grnd_level: 1020.75,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 1.83, deg: 284.506 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-03 00:00:00'
    },
    {
      dt: 1486090800,
      main: {
        temp: 285.034,
        temp_min: 285.034,
        temp_max: 285.034,
        pressure: 1020.08,
        sea_level: 1029.7,
        grnd_level: 1020.08,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 1.01, deg: 172.002 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-03 03:00:00'
    },
    {
      dt: 1486101600,
      main: {
        temp: 286.158,
        temp_min: 286.158,
        temp_max: 286.158,
        pressure: 1018.77,
        sea_level: 1028.39,
        grnd_level: 1018.77,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 0.71, deg: 181.009 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-03 06:00:00'
    },
    {
      dt: 1486112400,
      main: {
        temp: 286.138,
        temp_min: 286.138,
        temp_max: 286.138,
        pressure: 1019.17,
        sea_level: 1028.73,
        grnd_level: 1019.17,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 1.51, deg: 85.0026 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 09:00:00'
    },
    {
      dt: 1486123200,
      main: {
        temp: 285.952,
        temp_min: 285.952,
        temp_max: 285.952,
        pressure: 1019.74,
        sea_level: 1029.36,
        grnd_level: 1019.74,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.68, deg: 76.5032 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 12:00:00'
    },
    {
      dt: 1486134000,
      main: {
        temp: 285.828,
        temp_min: 285.828,
        temp_max: 285.828,
        pressure: 1019.23,
        sea_level: 1029.02,
        grnd_level: 1019.23,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.36, deg: 98.0014 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 15:00:00'
    },
    {
      dt: 1486144800,
      main: {
        temp: 285.168,
        temp_min: 285.168,
        temp_max: 285.168,
        pressure: 1018.15,
        sea_level: 1027.96,
        grnd_level: 1018.15,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 1.66, deg: 333.002 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 18:00:00'
    },
    {
      dt: 1486155600,
      main: {
        temp: 283.818,
        temp_min: 283.818,
        temp_max: 283.818,
        pressure: 1018.65,
        sea_level: 1028.36,
        grnd_level: 1018.65,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.77, deg: 359.001 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-03 21:00:00'
    },
    {
      dt: 1486166400,
      main: {
        temp: 283.157,
        temp_min: 283.157,
        temp_max: 283.157,
        pressure: 1019.84,
        sea_level: 1029.41,
        grnd_level: 1019.84,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 2.91, deg: 18.5013 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-04 00:00:00'
    },
    {
      dt: 1486177200,
      main: {
        temp: 283.494,
        temp_min: 283.494,
        temp_max: 283.494,
        pressure: 1018.56,
        sea_level: 1028.13,
        grnd_level: 1018.56,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 0.22, deg: 280.501 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-04 03:00:00'
    },
    {
      dt: 1486188000,
      main: {
        temp: 285.263,
        temp_min: 285.263,
        temp_max: 285.263,
        pressure: 1016.77,
        sea_level: 1026.41,
        grnd_level: 1016.77,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
      ],
      clouds: { all: 0 },
      wind: { speed: 1.88, deg: 273.501 },
      rain: {},
      sys: { pod: 'd' },
      dt_txt: '2017-02-04 06:00:00'
    },
    {
      dt: 1486198800,
      main: {
        temp: 285.927,
        temp_min: 285.927,
        temp_max: 285.927,
        pressure: 1017.03,
        sea_level: 1026.52,
        grnd_level: 1017.03,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' }
      ],
      clouds: { all: 12 },
      wind: { speed: 3.02, deg: 269.505 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-04 09:00:00'
    },
    {
      dt: 1486209600,
      main: {
        temp: 285.906,
        temp_min: 285.906,
        temp_max: 285.906,
        pressure: 1016.93,
        sea_level: 1026.64,
        grnd_level: 1016.93,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: { all: 44 },
      wind: { speed: 3.77, deg: 261.501 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-04 12:00:00'
    },
    {
      dt: 1486220400,
      main: {
        temp: 285.51,
        temp_min: 285.51,
        temp_max: 285.51,
        pressure: 1016.46,
        sea_level: 1026.16,
        grnd_level: 1016.46,
        humidity: 100,
        temp_kf: 0
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      clouds: { all: 44 },
      wind: { speed: 2.97, deg: 283.001 },
      rain: {},
      sys: { pod: 'n' },
      dt_txt: '2017-02-04 15:00:00'
    }
  ],
  city: {
    id: 1851632,
    name: 'Shuzenji',
    coord: { lat: 35.0164, lon: 139.0077 },
    country: 'none'
  }
};
