/**
 * @class WSpot
 */
'use strict'

const {
  allMethodNames,
  getByNamepath,
  setByNamepath,
  newId
} = require('./helpers')

const {
  validateVerbName
} = require('./validators')

class WSpotBase {
  constructor () {
    const s = this
    s.$loaded = {}
  }

  $$getSubject (subject) {
    const s = this
    return getByNamepath(s.$loaded, subject)
  }

  $$setSubject (subject, instance) {
    const s = this
    setByNamepath(s.$loaded, subject, instance)
  }

  $$hasSubject (subject) {
    const s = this
    return !!s.$$getSubject(subject)
  }

  $$getSpec (subject) {
    const s = this
    return s.specs[subject]
  }

  $$hasSpec (subject) {
    const s = this
    return !!s.$$getSpec(subject)
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

/** @lends WSpot */
class WSpot extends WSpotBase {
  constructor (id = newId()) {
    super()
    const s = this
    s.id = id
    s.signals = {}
    s.specs = {}
  }

  /**
   * Load subject into the signal
   * @param Class
   * @param {...string} names - Name paths
   * @returns {object} - Loaded instance
   */
  load (Class, ...names) {
    const subject = names.join('.')
    const s = this
    const instance = new Class()
    s.$$setSubject(subject, instance)
    const verbNames = allMethodNames(instance)
    for (const verbName of verbNames) {
      validateVerbName(verbName)
    }

    s.specs[subject] = Object.assign({},
      ...verbNames.map((verb) => ({
        [verb]: {
          name: verb
        }
      }))
    )
    return instance
  }

  /**
   * Use subject
   * @param {...string} names - Name paths
   * @returns {Promise.<Object>} - Local loaded subject or remote subject proxy
   */
  async use (...names) {
    const subject = names.join('.')
    const s = this
    const instance = s.$$getSubject(subject)
    if (instance) {
      return instance
    }
    const spec = await s.ask(subject)
    if (!spec) {
      throw new Error(`[WSpot] Unknown subject: ${subject}`)
    }
    return Object.assign({},
      ...Object.entries(spec).map(([verb, spec]) => ({
        [verb]: async function methodProxy (...params) {
          const res = await s.send({
            method: [subject, verb].join('.'),
            params,
            id: newId(),
            w: {
              subject,
              verb,
              stack: [],
              object: params
            }
          })
          if (!res) {
            throw new Error(`Unknown verb: ${verb}`)
          }
          const {result, error} = res
          if (error) {
            throw error
          }
          return result
        }
      }))
    )
  }

  /**
   * Connect to another signal
   * @param {WSpot} signal
   * @returns {Promise.<void>}
   */
  async connect (signal) {
    const s = this
    const {id} = signal
    const isKnown = s.signals[id]
    if (isKnown) {
      return
    }
    s.signals[id] = signal
    await signal.connect(s)
  }

  /**
   * Disconnect another signal
   * @param id
   * @returns {Promise.<void>}
   */
  async disconnect (id) {
    const s = this
    if (!id) {
      return
    }
    id = id.id || id
    const signal = s.signals[id]
    if (!signal) {
      return
    }
    delete s.signals[id]
    await signal.disconnect(s.id)
  }

  /**
   * Send message
   * @param config
   * @returns {Promise.<*>}
   */
  async send (config = {}) {
    // TODO cache which signal to use
    const s = this
    const {subject, verb, stack = [], object} = config.w
    if (s.$$hasSubject(subject)) {
      return await s.$$invokeSubject(subject, verb, object)
    }
    stack.push(s.id)
    const signals = Object.values(s.signals).filter(({id}) => !stack.includes(id))
    for (const signal of signals) {
      const res = await signal.send(Object.assign({}, config, {
        w: {subject, verb, stack, object}
      }))
      if (res) {
        return res
      }
    }
    return null
  }

  /**
   * Ask subject spec
   * @param {string} subject
   * @param {Object} options
   * @returns {Promise.<Object>}
   */
  async ask (subject, options = {}) {
    // TODO cache
    const s = this
    const {stack = []} = options
    if (s.$$hasSpec(subject)) {
      return s.$$getSpec(subject)
    }
    stack.push(s.id)
    const signals = Object.values(s.signals).filter(({id}) => !stack.includes(id))
    for (const signal of signals) {
      const asked = await signal.ask(subject, {stack})
      if (asked) {
        return asked
      }
    }
    return null
  }
}

Object.assign(WSpot, {newId})

module.exports = WSpot
