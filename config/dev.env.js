'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://192.168.1.6:8888/api"'
  // API_ROOT: '"http://192.168.22.89:8888/api"'
})
