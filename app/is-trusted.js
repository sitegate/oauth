'use strict';

var ServerError = require('bograch').ServerError;
var clientClient = require('./clients/client-client');
var userClient = require('./clients/user-client');

module.exports = function (params, cb) {
  params = params || {};
  
  if (!params.clientId) {
    return cb(new ServerError('missingParam', 'clientId is missing'));
  }
  if (!params.userId) {
    return cb(new ServerError('missingParam', 'userId is missing'));
  }
  
  clientClient.getById({
    id: params.clientId
  }, function (err, client) {
    if (err) {
      return cb(err, null);
    }
    
    if (client.trusted) {
      return cb(null, true);
    }
    
    userClient.trustsClient(params, cb);
  });
};