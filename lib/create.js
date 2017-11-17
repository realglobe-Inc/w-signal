/**
 * Create a WSpot instance
 * @function create
 * @param {...*} args
 * @returns {WSpot}
 */
'use strict'

const WSpot = require('./WSpot')

/** @lends create */
function create (...args) {
  return new WSpot(...args)
}

module.exports = create
