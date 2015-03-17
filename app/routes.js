'use strict';

var exchange = require('./exchange');
var createCode = require('./create-code');
var authToken = require('./auth-token');

module.exports = function (server) {
  server.addMethods({
    exchange: exchange,
    createCode: createCode,
    authToken: authToken
  });
};