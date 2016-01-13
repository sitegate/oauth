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
    handler(params) {
      return Code.findOne({
          value: params.code,
        })
        .exec()
        .then(authCode => {
          if (!authCode) return Promise.resolve(false)

          if (params.clientId !== authCode.clientId)
            return Promise.resolve(false)

          if (params.redirectUri !== authCode.redirectUri)
            return Promise.resolve(false)

          // Delete auth code now that it has been used
          return authCode.remove()
            .then(() => {
              // Create a new access token
              let token = new Token({
                value: uid(256),
                clientId: authCode.clientId,
                userId: authCode.userId,
              })

              // Save the access token and check for errors
              return token.save().then(token => Promise.resolve(token.value))
            })
        })
    },
  })

  next()
}

module.exports.attributes = {
  name: 'exchange',
}
