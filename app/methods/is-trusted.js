'use strict'
const joi = require('joi')

module.exports = function(ms, opts) {
  let client = ms.plugins['jimbo-client'].client
  let user = ms.plugins['jimbo-client'].user

  ms.method({
    name: 'isTrusted',
    config: {
      validate: {
        clientId: joi.string().required(),
        userId: joi.string().required(),
      },
    },
    handler(params) {
      return client.getById(params.clientId).exec()
        .then(client => {
          if (client.trusted)
            return Promise.resolve(true)

          return user.trustsClient(params)
        })
    },
  })
}

module.exports.attributes = {
  name: 'is-trusted',
}
