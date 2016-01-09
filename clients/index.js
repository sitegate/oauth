'use strict'

module.exports = function(service, opts, next) {
  if (!opts.amqpURL)
    return next(new Error('amqpURL is required'))

  service.client({
    name: 'user',
    channel: 'sitegate-user',
    url: opts.amqpURL,
    methods: [],
  })

  service.client({
    name: 'client',
    channel: 'sitegate-client',
    url: opts.amqpURL,
    methods: [],
  })

  next()
}

module.exports.attributes = {
  name: 'clients',
}
