'use strict';

module.exports = function(ms) {
  var client = ms.clients.client;
  var user = ms.clients.user;

  return function(params, cb) {
    params = params || {};

    if (!params.clientId) {
      return cb(new Error('clientId is missing'));
    }
    if (!params.userId) {
      return cb(new Error('userId is missing'));
    }

    client.getById(params.clientId, function(err, client) {
      if (err) {
        return cb(err, null);
      }

      if (client.trusted) {
        return cb(null, true);
      }

      user.trustsClient(params, cb);
    });
  };
};
