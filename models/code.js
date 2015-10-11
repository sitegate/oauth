'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CodeSchema = new Schema({
  value: {
    type: String,
    required: true
  },
  redirectUri: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  }
});

module.exports = function(connection) {
  return connection.model('Code', CodeSchema);
};
