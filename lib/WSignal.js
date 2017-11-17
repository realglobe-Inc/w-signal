/**
 * @class WSignal
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

class WSignalBase {}

/** @lends WSignal */
class WSignal extends WSignalBase {
  constructor (id = newId()) {
    super()
    const s = this
    s.id = id
    s.signals = {}
    s.loaded = {}
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
    setByNamepath(s.loaded, subject, instance)
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

  async open (options = {}) {
  }

  async close (options = {}) {
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
    const spec = await s.$$ask(subject)
    if (!spec) {
      throw new Error(`[WSignal] Unknown subject: ${subject}`)
    }
    return Object.assign({},
      ...Object.entries(spec).map(([verb, spec]) => ({
        [verb]: async function methodProxy (...params) {
          const res = await s.$$send({
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
   * @param {WSignal} signal
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
   * Send message
   * @param config
   * @returns {Promise.<*>}
   */
  async $$send (config = {}) {
    // TODO cache which signal to use
    const s = this
    const {subject, verb, stack = [], object} = config.w
    if (s.$$hasSubject(subject)) {
      return await s.$$invokeSubject(subject, verb, object)
    }
    stack.push(s.id)
    const signals = Object.values(s.signals).filter(({id}) => !stack.includes(id))
    for (const signal of signals) {
      const res = await signal.$$send(Object.assign({}, config, {
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
  async $$ask (subject, options = {}) {
    // TODO cache
    const s = this
    const {stack = []} = options
    if (s.$$hasSpec(subject)) {
      return s.$$getSpec(subject)
    }
    stack.push(s.id)
    const signals = Object.values(s.signals).filter(({id}) => !stack.includes(id))
    for (const signal of signals) {
      const asked = await signal.$$ask(subject, {stack})
      if (asked) {
        return asked
      }
    }
    return null
  }

  $$getSubject (subject) {
    const s = this
    return getByNamepath(s.loaded, subject)
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

  $$getSpec (subject) {
    const s = this
    return s.specs[subject]
  }

  $$hasSpec (subject) {
    const s = this
    return !!s.$$getSpec(subject)
  }
}

Object.assign(WSignal, {newId})

module.exports = WSignal
