'use strict';

var config = require('./config');
var Server = require('uva-amqp').Server;

var server = new Server({
  channel: 'oauth',
  url: config.get('amqpUrl')
});

var routes = require('./app/routes');
routes(server);
