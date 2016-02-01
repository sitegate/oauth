'use strict'
module.exports = function(service, opts) {
  if (!opts.amqpURL)
    throw new Error('amqpURL is required')

  return service.client({
    name: 'user',
    channel: 'sitegate-user',
    amqpURL: opts.amqpURL,
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
  .then(() =>
    service.client({
      name: 'client',
      channel: 'sitegate-client',
      amqpURL: opts.amqpURL,
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
  )
}

module.exports.attributes = {
  name: 'clients',
}
