'use strict'
const joi = require('joi')

module.exports = function(ms, opts) {
  let Token = ms.plugins.models.Token
  let user = ms.plugins['jimbo-client'].user
  let client = ms.plugins['jimbo-client'].client

  ms.method({
    name: 'authToken',
    config: {
      validate: joi.object().keys({
        accessToken: joi.string().required(),
        userId: joi.string(),
        clientId: joi.string(),
      }).xor('userId', 'clientId'),
    },
    handler(params) {
      return Token.findOne({
        value: params.accessToken,
      }).exec()
        .then(token => {
          if (!token) return Promise.resolve(false)

          if (new Date() > token.expirationDate)
            return Token.delete(params.accessToken)

          if (token.userId !== null)
            return user.getById(token.userId)
              .then(user => {
                if (!user) return Promise.resolve(false)

                // to keep this example simple, restricted scopes
                // are not implemented,
                // and this is just for illustrative purposes
                let info = {
                  scope: '*',
                }
                return Promise.resolve({
                  user,
                  info,
                })
              })

          //The request came from a client only since userID is null
          //therefore the client is passed back instead of a user
          return client.getById(token.clientId)
            .then(client => {
              if (!client) return Promise.resolve(false)

              // to keep this example simple, restricted scopes are not implemented,
              // and this is just for illustrative purposes
              let info = {
                scope: '*',
              }
              return Promise.resolve({client, info})
            })
        })
    },
  })
}

module.exports.attributes = {
  name: 'auth-token',
}
