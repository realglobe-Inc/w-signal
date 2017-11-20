/**
 * Cache mix
 * @function cacheMix
 * @param {function} Class - Class to mix
 * @return {function} - Mixed class
 */
'use strict'

const LRU = require('lru-cache')

/** @lends cacheMix */
function cacheMix (Class) {
  class CacheMixed extends Class {
    constructor () {
      super(...arguments)
      const s = this
      s.$$subjectSpotCache = LRU({
        max: 100,
        maxAge: 3 * 1000
      })
    }
  }

  return CacheMixed
}

module.exports = cacheMix
