'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Token = ms.plugins.models.Token
  let user = ms.plugins['jimbo-client'].user
  let client = ms.plugins['jimbo-client'].client

  ms.method({
    name: 'authToken',
    config: {
      validate: {
        accessToken: joi.string().required(),
      },
    },
    handler(params, cb) {
      Token.findOne({
        value: params.accessToken,
      }, function(err, token) {
        if (err) return cb(err)

        if (!token) return cb(null, false)

        if (new Date() > token.expirationDate)
          return Token.delete(params.accessToken, function(err) {
            return cb(err)
          })

        if (token.userID !== null) {
          user.getById(token.userId, function(err, user) {
            if (err) return cb(err)

            if (!user) return cb(null, false)

            // to keep this example simple, restricted scopes
            // are not implemented,
            // and this is just for illustrative purposes
            let info = {
              scope: '*',
            }
            return cb(null, user, info)
          })
          return
        }

        //The request came from a client only since userID is null
        //therefore the client is passed back instead of a user
        client.getById(token.clientId, function(err, client) {
          if (err) return cb(err)

          if (!client) return cb(null, false)

          // to keep this example simple, restricted scopes are not implemented,
          // and this is just for illustrative purposes
          let info = {
            scope: '*',
          }
          return cb(null, client, info)
        })
      })
    },
  })

  next()
}

module.exports.attributes = {
  name: 'auth-token',
}
