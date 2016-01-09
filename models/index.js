'use strict'
const debug = require('debug')('sitegate:user')
const mongoose = require('mongoose')

module.exports = function(service, opts, next) {
  if (!opts.mongoURI)
    return next(new Error('mongoURI is required'))

  let connection = mongoose.createConnection(opts.mongoURI)

  connection.on('connected', () => debug('Mongoose connected in OAuth microservice'))

  service.expose({
    Code: require('./code')(connection),
    Token: require('./token')(connection),
  })

  next()
}

module.exports.attributes = {
  name: 'models',
}
