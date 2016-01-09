'use strict'
const config = require('./config')
const Server = require('jimbo').Server

let server = new Server()

server.connection({
  channel: 'sitegate-oauth',
  url: 'amqp://guest:guest@localhost:5672',
})

server
  .register([
    {
      register: require('./models'),
      options: {
        mongoURI: config.get('mongodbURI'),
      },
    },
    {
      register: require('jimbo-client'),
    },
    {
      register: require('./clients'),
      options: {
        amqpURL: config.get('amqpURI'),
      },
    },
    {
      register: require('./app/methods/authToken'),
    },
    {
      register: require('./app/methods/createCode'),
    },
    {
      register: require('./app/methods/exchange'),
    },
    {
      register: require('./app/methods/isTrusted'),
    },
  ])
  .then(() => server.start())
  .then(() => console.log('oauth server started'))
  .catch(err => {throw err})
