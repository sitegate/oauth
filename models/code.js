'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let CodeSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  redirectUri: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
})

module.exports = function(connection) {
  return connection.model('Code', CodeSchema)
}
