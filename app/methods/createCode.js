'use strict'
const uid = require('rand-token').uid
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Code = ms.plugins.models.Code

  ms.method({
    name: 'createCode',
    config: {
      validate: {
        userId: joi.string().required(),
        clientId: joi.string().required(),
        redirectUri: joi.string().required(),
      },
    },
    handler(params, cb) {
      // Create a new authorization code
      let code = new Code({
        value: uid(16),
        clientId: params.clientId,
        redirectUri: params.redirectUri,
        userId: params.userId,
      })

      // Save the auth code and check for errors
      code.save(function(err) {
        if (err) return cb(err)

        cb(null, code.value)
      })
    },
  })

  next()
}

module.exports.attributes = {
  name: 'create-code',
}
