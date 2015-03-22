'use strict';

var Code = require('../models/code');
var Token = require('../models/token');
var uid = require('./helpers/uid');

module.exports = function (params, cb) {
  params = params || {};
  
  if (!params.code) {
    return cb(new Error('code is missing'));
  }
  
  if (!params.clientId) {
    return cb(new Error('clientId is missing'));
  }
  
  if (!params.redirectUri) {
    return cb(new Error('redirectUri is missing'));
  }
  
  Code.findOne({
    value: params.code
  }, function (err, authCode) {
    if (err) {
      return cb(err);
    }
    if (!authCode) {
      return cb(null, false);
    }
    if (params.clientId !== authCode.clientId) {
      return cb(null, false);
    }
    if (params.redirectUri !== authCode.redirectUri) {
      return cb(null, false);
    }

    // Delete auth code now that it has been used
    authCode.remove(function (err) {
      if (err) {
        return cb(err);
      }

      // Create a new access token
      var token = new Token({
        value: uid(256),
        clientId: authCode.clientId,
        userId: authCode.userId
      });

      // Save the access token and check for errors
      token.save(function (err) {
        if (err) {
          return cb(err);
        }

        cb(null, token.value);
      });
    });
  });
};