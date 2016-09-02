const axios = require('axios');

const _baseURL = 'http://api.openweathermap.org/data/2.5/';
const _APIKEY = '38ca7e6582dd043fc9b516d1af13ea48';

function prepRouteParams (queryStringData) {
  return Object.keys(queryStringData)
    .map((key) => key + '=' + encodeURIComponent(queryStringData[key]))
    .join('&')
}

function prepUrl (type, queryStringData) {
  return `${_baseURL + type}?${prepRouteParams(queryStringData)}`
}

function getQueryStringData (city) {
  return {
    q: city,
    type: 'accurate',
    APPID: _APIKEY,
    cnt: 5
  }
}

export function getCurrentWeather (city) {
  const queryStringData = getQueryStringData(city)
  const url = prepUrl('weather', queryStringData)

  return axios.get(url)
      .then((currentWeatherData) => currentWeatherData.data)
}

export function getForecast (city) {
  var queryStringData = getQueryStringData(city);
  var url = prepUrl('forecast/daily', queryStringData)

  return axios.get(url)
    .then(function (forecastData) {
      return forecastData.data
    })
}

