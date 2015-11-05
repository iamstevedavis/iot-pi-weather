'use strict';

var WeatherUtils = module.exports = {};

var nconf = require('nconf');
var path = require('path');
var request = require('superagent-bluebird-promise');

nconf.file(path.resolve(__dirname, '../config/config.json'));

WeatherUtils.apiKey = nconf.get('externalAPIConfig:apiKey');
WeatherUtils.baseURL = nconf.get('externalAPIConfig:baseURL');
WeatherUtils.units = nconf.get('appConfig:units') || 'metric';

WeatherUtils.getWeatherByLocationId = function getWeatherById(locationId) {
  var url = this.baseURL + 'forecast/city';

  return request.get(url)
    .query({ id: locationId })
    .query({ units: this.units })
    .query({ APPID: this.apiKey })
    .promise();
};

WeatherUtils.getWeatherByLocationSearch = function getWeatherBySearch(query) {
  var url = this.baseURL + 'find';

  return request.get(url)
    .query({ q: query })
    .query({ units: this.units })
    .query({ type: 'like' })
    .query({ APPID: this.apiKey })
    .promise();
};
