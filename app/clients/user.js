'use strict';

var Client = require('uva-amqp').Client;
var config = require('../../config');

var client = new Client({
  channel: 'user',
  url: config.get('amqpUrl')
});

client.register('getById', 'trustsClient');

module.exports = client.methods;
