'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define our token schema
let TokenSchema = new Schema({
  value: {
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
  return connection.model('Token', TokenSchema)
}
