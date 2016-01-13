'use strict'
const uid = require('rand-token').uid
const joi = require('joi')

module.exports = function(ms, opts) {
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
    handler(params) {
      // Create a new authorization code
      let code = new Code({
        value: uid(16),
        clientId: params.clientId,
        redirectUri: params.redirectUri,
        userId: params.userId,
      })

      // Save the auth code and check for errors
      return code.save().then(code => Promise.resolve(code.value))
    },
  })
}

module.exports.attributes = {
  name: 'create-code',
}
