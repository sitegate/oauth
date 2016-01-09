'use strict'
const uid = require('rand-token').uid
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Code = ms.plugins.models.Code
  let Token = ms.plugins.models.Token

  ms.method({
    name: 'exchange',
    config: {
      validate: {
        code: joi.string().required(),
        clientId: joi.string().required(),
        redirectUri: joi.string().required(),
      },
    },
    handler(params, cb) {
      Code.findOne({
        value: params.code,
      }, function(err, authCode) {
        if (err) return cb(err)

        if (!authCode) return cb(null, false)

        if (params.clientId !== authCode.clientId)
          return cb(null, false)

        if (params.redirectUri !== authCode.redirectUri)
          return cb(null, false)

        // Delete auth code now that it has been used
        authCode.remove(function(err) {
          if (err) return cb(err)

          // Create a new access token
          let token = new Token({
            value: uid(256),
            clientId: authCode.clientId,
            userId: authCode.userId,
          })

          // Save the access token and check for errors
          token.save(function(err) {
            if (err) return cb(err)

            cb(null, token.value)
          })
        })
      })
    },
  })

  next()
}

module.exports.attributes = {
  name: 'exchange',
}
