'use strict';

var Code = require('../models/code');
var uid = require('./helpers/uid');

module.exports = function (params, cb) {
  params = params || {};
  
  if (!params.userId) {
    return cb(new Error('userId is missing'));
  }
  
  if (!params.clienId) {
    return cb(new Error('clienId is missing'));
  }
  
  if (!params.redirectUri) {
    return cb(new Error('redirectUri is missing'));
  }
  
  // Create a new authorization code
  var code = new Code({
    value: uid(16),
    clientId: params.clienId,
    redirectUri: params.redirectUri,
    userId: params.userId
  });

  // Save the auth code and check for errors
  code.save(function (err) {
    if (err) {
      return cb(err);
    }

    cb(null, code.value);
  });
};