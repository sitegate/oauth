'use strict';

module.exports = function(ms) {
  var Token = ms.models.Token;
  var user = ms.clients.user;
  var client = ms.clients.client;

  return function(accessToken, cb) {
    Token.findOne({
      value: accessToken
    }, function(err, token) {
      if (err) {
        return cb(err);
      }
      if (!token) {
        return cb(null, false);
      }
      if (new Date() > token.expirationDate) {
        Token.delete(accessToken, function(err) {
          return cb(err);
        });
        return;
      }
      if (token.userID !== null) {
        user.getById(token.userId, function(err, user) {
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
      client.getById(token.clientId, function(err, client) {
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
};
