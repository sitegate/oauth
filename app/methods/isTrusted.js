'use strict';

var ServerError = require('bograch').ServerError;
var Client = require('../clients/client');
var User = require('../clients/user');

module.exports = function (params, cb) {
  params = params || {};
  
  if (!params.clientId) {
    return cb(new ServerError('missingParam', 'clientId is missing'));
  }
  if (!params.userId) {
    return cb(new ServerError('missingParam', 'userId is missing'));
  }
  
  Client.getById({
    id: params.clientId
  }, function (err, client) {
    if (err) {
      return cb(err, null);
    }
    
    if (client.trusted) {
      return cb(null, true);
    }
    
    User.trustsClient(params, cb);
  });
};