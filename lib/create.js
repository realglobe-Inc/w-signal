/**
 * Create a WSignal instance
 * @function create
 * @param {...*} args
 * @returns {WSignal}
 */
'use strict'

const WSignal = require('./WSignal')

/** @lends create */
function create (...args) {
  return new WSignal(...args)
}

module.exports = create
