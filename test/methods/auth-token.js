'use strict'
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const expect = chai.expect
const plugiator = require('plugiator')
const jimbo = require('jimbo')
const authToken = require('../../app/methods/auth-token')
const createCode = require('../../app/methods/create-code')
const exchange = require('../../app/methods/exchange')
const modelsPlugin = require('../../models')
const config = require('../../config')
const clearDB = require('mocha-mongoose')(config.get('mongodbURI'))

chai.use(chaiAsPromised)

describe('authToken', function() {
  beforeEach(clearDB)
  beforeEach(function(next) {
    this._server = new jimbo.Server()

    this._server.register([
      {
        register: modelsPlugin,
        options: {
          mongoURI: config.get('mongodbURI'),
        },
      },
    ], err => next(err))
  })

  it('should register client', function() {
    let userId = '507f191e810c19729de860ea'
    let clientId = '666f191e810c19729de860ea'
    let redirectUri = 'http://foo.com/callback'
    let code
    let token
    return this._server
      .register([
        {
          register: createCode,
        },
        {
          register: exchange,
        },
        {
          register: plugiator.create('jimbo-client', (server, opts) => {
            server.expose('user', {
              getById(userId) {
                return Promise.resolve({
                  id: userId,
                })
              },
            })
          }),
        },
        {
          register: plugiator.anonymous((server, opts) => {
            return server.methods.createCode({
                userId,
                clientId,
                redirectUri,
              })
              .then(code$ => code = code$)
          }),
        },
        {
          register: plugiator.anonymous((server, opts) => {
            return server.methods.exchange({
              code,
              clientId,
              redirectUri,
            })
            .then(token$ => token = token$)
          }),
        },
        {
          register: authToken,
        },
      ])
      .then(() => this._server.methods.authToken({
          userId,
          accessToken: token,
        }))
      .then(result => {
        expect(result).to.exist
        expect(result.user).to.exist
        expect(result.info).to.exist
      })
  })
})
