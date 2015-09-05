'use strict';

var Client = require('../clients/client');
var User = require('../clients/user');

module.exports = function(params, cb) {
  params = params || {};

  if (!params.clientId) {
    return cb(new Error('clientId is missing'));
  }
  if (!params.userId) {
    return cb(new Error('userId is missing'));
  }

  Client.getById(params.clientId, function (err, client) {
    if (err) {
      return cb(err, null);
    }

    if (client.trusted) {
      return cb(null, true);
    }

    User.trustsClient(params, cb);
  });
};
