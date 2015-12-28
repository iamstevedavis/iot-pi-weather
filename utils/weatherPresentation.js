'use strict';

var WeatherPresentation = module.exports = {};

var nconf = require('nconf');
var path = require('path');

nconf.file(path.resolve(__dirname, '../config/config.json'));

WeatherPresentation.baseURL = nconf.get('externalAPIConfig:baseURL');
WeatherPresentation.icoPath = nconf.get('externalAPIConfig:icoPath');

WeatherPresentation.presentWeatherItem = function presentWeatherItem(weatherBlob) {
  var main = weatherBlob && weatherBlob.main;
  var weather = weatherBlob && weatherBlob.weather[0];
  var json = {
    locationId: weatherBlob.id,
    time: weatherBlob.dt_txt,
    temp: main.temp,
    tempHigh: main.temp_max,
    tempLow: main.temp_min,
    humidity: main.humidity,
    description: weather.description,
    weatherIcon: WeatherPresentation.baseURL + WeatherPresentation.icoPath + weather.icon + '.png'
  }
  return json;
};

WeatherPresentation.presentWeatherList = function presentWeatherList(weatherList) {
  var json = {};
  json.weatherData = weatherList.map(WeatherPresentation.presentWeatherItem);
  return json;
};

WeatherPresentation.presentWeatherWithCity = function presentWeatherList(weatherData) {
  var weatherList = weatherData.list;
  var city = weatherData.city;
  var json = {
    city: {
      cityId: city.id,
      cityName: city.name,
      cityCountryCode: city.country
    }
  }
  json.weatherData = weatherList.map(WeatherPresentation.presentWeatherItem);
  return json;
};
