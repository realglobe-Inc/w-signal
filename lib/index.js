/**
 * Signal converter for w
 * @module w-signal
 */
'use strict'

const WSignal = require('./WSignal')
const create = require('./create')

const lib = create.bind(this)

Object.assign(lib, {
  WSignal,
  create
})

module.exports = lib
