/**
 * Mixin base
 * @function baseMix
 * @param {function} Class - Class to mix
 * @return {function} - Mixed class
 */
'use strict'

const {
  getByNamepath,
  setByNamepath
} = require('../helpers')

/** @lends baseMix */
function baseMix (Class) {
  class BaseMixed extends Class {
    constructor () {
      super()
      const s = this
      s.$$subjects = {} // Locally loaded subjects
    }

    $$getSubject (subject) {
      const s = this
      return getByNamepath(s.$$subjects, subject)
    }

    $$setSubject (subject, instance) {
      const s = this
      setByNamepath(s.$$subjects, subject, instance)
    }

    $$hasSubject (subject) {
      const s = this
      return !!s.$$getSubject(subject)
    }

    async $$invokeSubject (subject, verb, object) {
      const s = this
      const instance = s.$$getSubject(subject)
      try {
        const result = await instance[verb](...object)
        return {result}
      } catch (e) {
        return {error: e}
      }
    }
  }

  return BaseMixed
}

module.exports = baseMix
