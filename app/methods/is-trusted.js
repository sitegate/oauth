'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
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
    handler(params, cb) {
      client.getById(params.clientId, function(err, client) {
        if (err) return cb(err, null)

        if (client.trusted) return cb(null, true)

        user.trustsClient(params, cb)
      })
    },
  })

  next()
}

module.exports.attributes = {
  name: 'is-trusted',
}
