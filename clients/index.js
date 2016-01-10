'use strict'
module.exports = function(service, opts, next) {
  if (!opts.amqpURL)
    return next(new Error('amqpURL is required'))

  service.client({
    name: 'user',
    channel: 'sitegate-user',
    url: opts.amqpURL,
    methods: [
      'authenticate',
      'changePassword',
      'changePasswordUsingToken',
      'disconnectProvider',
      'getById',
      'getByUsername',
      'getTrustedClients',
      'query',
      'register',
      'requestPasswordChangeByEmail',
      'revokeAllClientsAccess',
      'revokeClientAccess',
      'saveOAuthUserProfile',
      'sendVerificationEmail',
      'trustClient',
      'trustsClient',
      'update',
      'validateResetToken',
      'verifyEmailByToken',
    ],
  })

  service.client({
    name: 'client',
    channel: 'sitegate-client',
    url: opts.amqpURL,
    methods: [
      'create',
      'getById',
      'getById',
      'getByPublicId',
      'query',
      'remove',
      'update',
    ],
  })

  next()
}

module.exports.attributes = {
  name: 'clients',
}
