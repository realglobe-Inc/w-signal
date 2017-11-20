/**
 * Mixin spec
 * @function specMix
 * @param {function} Class - Class to mix
 * @return {function} - Mixed class
 */
'use strict'

/** @lends specMix */
function specMix (Class) {
  class SpecMixed extends Class {
    constructor () {
      super()
      const s = this
      s.$$specs = {}
    }

    $$getSpec (subject) {
      const s = this
      return s.$$specs[subject]
    }

    $$setSpec (subject, spec) {
      const s = this
      s.$$specs[subject] = spec
    }

    $$hasSpec (subject) {
      const s = this
      return !!s.$$getSpec(subject)
    }
  }

  return SpecMixed
}

module.exports = specMix
