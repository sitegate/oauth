'use strict';

var bo = require('bograch');

var client = bo.client('amqp', {
  name: 'user'
});

client.register('getById', 'trustsClient');

module.exports = client.methods;