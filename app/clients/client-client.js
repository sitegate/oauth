'use strict';

var bo = require('bograch');

var client = bo.client('amqp', {
  name: 'client'
});

client.register('getById');

module.exports = client;