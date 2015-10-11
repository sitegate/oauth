'use strict';

var mongoose = require('mongoose');

module.exports = function(mongoURI) {
  var connection = mongoose.createConnection(mongoURI);

  connection.on('connected', function() {
    console.log('Mongoose connected in OAuth microservice');
  });

  var models = {
    Code: require('./code')(connection),
    Token: require('./token')(connection)
  };

  return models;
};
