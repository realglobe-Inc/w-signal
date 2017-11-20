/**
 * Spot mix
 * @function spotMix
 * @param {function} Class - Class to mix
 * @return {function} - Mixed class
 */
'use strict'

/** @lends spotMix */
function spotMix (Class) {
  class SpotMixed extends Class {
    constructor () {
      super(...arguments)
      const s = this
      s.$$spots = {}
    }

    $$getSpot (id) {
      const s = this
      return s.$$spots[id]
    }

    $$setSpot (id, spot) {
      const s = this
      s.$$spots[id] = spot
    }

    $$delSpot (id) {
      const s = this
      delete s.$$spots[id]
    }

    $$listSpots (options = {}) {
      const s = this
      const {
        prior = [],
        excludes = []
      } = options

      return [
        ...prior,
        ...Object.keys(s.$$spots)
          .filter((id) => !excludes.includes(id) && !prior.includes(id))
      ].filter(Boolean)
        .map((id) => s.$$getSpot(id))
    }
  }

  return SpotMixed
}

module.exports = spotMix
