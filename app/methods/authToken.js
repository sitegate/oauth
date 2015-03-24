'use strict';

var Token = require('../../models/token');
var User = require('../clients/user');
var Client = require('../clients/client');

module.exports = function (params, cb) {
  Token.findOne({
    value: params.accessToken
  }, function (err, token) {
    if (err) {
      return cb(err);
    }
    if (!token) {
      return cb(null, false);
    }
    if (new Date() > token.expirationDate) {
      Token.delete(params.accessToken, function (err) {
        return cb(err);
      });
      return;
    }
    if (token.userID !== null) {
      User.getById(token.userId, function (err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        // to keep this example simple, restricted scopes
        // are not implemented,
        // and this is just for illustrative purposes
        var info = {
          scope: '*'
        };
        return cb(null, user, info);
      });
      return;
    }
    //The request came from a client only since userID is null
    //therefore the client is passed back instead of a user
    Client.getById(token.clientId, function (err, client) {
      if (err) {
        return cb(err);
      }
      if (!client) {
        return cb(null, false);
      }
      // to keep this example simple, restricted scopes are not implemented,
      // and this is just for illustrative purposes
      var info = {
        scope: '*'
      };
      return cb(null, client, info);
    });
  });
};