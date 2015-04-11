'use strict';

var bo = require('bograch');
var config = require('../../config');

var client = bo.client('amqp', {
  name: 'user',
  amqpURL: config.get('amqpUrl')
});

client.register('getById', 'trustsClient');

client.connect();

module.exports = client.methods;