'use strict';

var methodNames = require('./method-names');

module.exports = function(opts) {
  opts = opts || {};

  if (!opts.models) {
    throw new Error('`opts.models` is required');
  }
  if (!opts.models.Token) {
    throw new Error('`opts.models.Token` is required');
  }
  if (!opts.models.Code) {
    throw new Error('`opts.models.Code` is required');
  }
  if (!opts.clients) {
    throw new Error('`opts.clients` is required');
  }
  if (!opts.clients.user) {
    throw new Error('`opts.clients.user` is required');
  }
  if (!opts.clients.client) {
    throw new Error('`opts.clients.client` is required');
  }

  var ms = {
    models: opts.models,
    clients: opts.clients,
    methods: {}
  };
  methodNames.forEach(function(methodName) {
    var methodFactory = require('./methods/' + methodName);
    ms.methods[methodName.replace('.js', '')] = methodFactory(ms);
  });
  return ms.methods;
};
