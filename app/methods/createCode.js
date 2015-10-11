'use strict';

var uid = require('rand-token').uid;

module.exports = function(ms) {
  var Code = ms.models.Code;

  return function(params, cb) {
    params = params || {};

    if (!params.userId) {
      return cb(new Error('userId is missing'));
    }

    if (!params.clientId) {
      return cb(new Error('clientId is missing'));
    }

    if (!params.redirectUri) {
      return cb(new Error('redirectUri is missing'));
    }

    // Create a new authorization code
    var code = new Code({
      value: uid(16),
      clientId: params.clientId,
      redirectUri: params.redirectUri,
      userId: params.userId
    });

    // Save the auth code and check for errors
    code.save(function(err) {
      if (err) {
        return cb(err);
      }

      cb(null, code.value);
    });
  };
};
