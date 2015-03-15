'use strict';

var exchange = require('./exchange');
var createCode = require('./create-code');
var authToken = require('./auth-token');

module.exports = function (worker) {
  worker.on('oauth.exchange', exchange);
  
  worker.on('oauth.createCode', createCode);
  
  worker.on('oauth.authToken', authToken);
};