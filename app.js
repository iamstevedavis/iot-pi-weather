'use strict';

var bunyan = require('bunyan');
var restify = require('restify');

var pJson = require('./package.json');
var weatherUtils = require('./utils/weatherUtils');

/*****************************
 * Initialize Restify Server *
 *****************************/
var log = bunyan.createLogger({name: 'BunyanLogger'});
var server = restify.createServer({
  name: pJson.name,
  log: log
});

server.use(restify.queryParser());

server.use(restify.requestLogger());

server.on('after', restify.auditLogger({
    log: log
}));

/*************
 * Endpoints *
 *************/
server.get('/weather/v1/status', function getStatus(req, res, next) {
  res.send(200);
  return next();
});

server.get('/weather/v1/forecast', function getWeatherByLocationId(req, res, next) {
  var locationId = (req.params && req.params.locationId);

  if(!locationId) {
    res.send(400, {
      code: 'missingQueryParam',
      text: 'This call has been made incorrectly. Missing locationId.',
      q: locationId
    });
    return next();
  }

  return weatherUtils.getWeatherByLocationId(locationId)
    .then(function _success(resp) {
      var response = resp && resp.body;
      res.send(200, response);
      return next();
    })
    .catch(function _failed(error) {
      res.send(400, error);
      return next();
    });
});

server.get('/weather/v1/find', function getWeatherByLocationSearch(req, res, next) {
  var locationQuery = (req.params && req.params.q);

  if(!locationQuery) {
    res.send(400, {
      code: 'missingQueryParam',
      text: 'This call has been made incorrectly. Missing q.',
      q: locationQuery
    });
    return next();
  }

  return weatherUtils.getWeatherByLocationSearch(locationQuery)
    .then(function _success(resp) {
      var response = resp && resp.body;
      res.send(200, response);
      return next();
    })
    .catch(function _failed(error) {
      res.send(400, error);
      return next();
    });
});

/****************
 * Start Server *
 ****************/
server.listen(8888, function _serverListenCallback() {
  log.info('%s listening at %s', server.name, server.url);
});
