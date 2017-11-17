/**
 * Signal converter for w
 * @module w-spot
 */
'use strict'

const WSpot = require('./WSpot')
const create = require('./create')

const lib = create.bind(this)

Object.assign(lib, WSpot, {
  WSpot,
  create
})

module.exports = lib
