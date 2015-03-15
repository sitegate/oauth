'use strict';

var bo = require('bograch');

var client = bo.client('amqp');

var userClient = {
  getById: function (id, cb) {
    client.call('user.getById', { id: id }, cb);
  }
};

module.exports = userClient;