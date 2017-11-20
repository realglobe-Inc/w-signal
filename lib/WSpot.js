/**
 * WSpot
 * @class WSpot
 * @param {string} [id=newId] - Id for spot
 */
'use strict'

const {
  allMethodNames,
  newId
} = require('./helpers')

const m = require('./mixins')

const {
  validateVerbName
} = require('./validators')

const WSpotBase = [
  m.specMix,
  m.subjectMix
].reduce(
  (Class, mix) => mix(Class),
  class Base {}
)

/** @lends WSpot */
class WSpot extends WSpotBase {
  constructor (id = newId()) {
    super()
    const s = this
    s.id = id
    s.spots = {} // Connected Spots
  }

  /**
   * Load subject into the spot
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
    const spec = Object.assign({},
      ...verbNames.map((verb) => ({
        [verb]: {
          name: verb
        }
      }))
    )
    s.$$setSpec(subject, spec)
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
   * Connect to another spot
   * @param {WSpot} spot
   * @returns {Promise.<void>}
   */
  async connect (spot) {
    const s = this
    const {id} = spot
    const isKnown = s.spots[id]
    if (isKnown) {
      return
    }
    s.spots[id] = spot
    await spot.connect(s)
  }

  /**
   * Disconnect another spot
   * @param id
   * @returns {Promise.<void>}
   */
  async disconnect (id) {
    const s = this
    if (!id) {
      return
    }
    id = id.id || id
    const spot = s.spots[id]
    if (!spot) {
      return
    }
    delete s.spots[id]
    await spot.disconnect(s.id)
  }

  /**
   * Send message
   * @param config
   * @returns {Promise.<*>}
   */
  async send (config = {}) {
    // TODO cache which spot to use
    const s = this
    const {subject, verb, stack = [], object} = config.w
    if (s.$$hasSubject(subject)) {
      return await s.$$invokeSubject(subject, verb, object)
    }
    stack.push(s.id)
    const spots = Object.values(s.spots).filter(({id}) => !stack.includes(id))
    for (const spot of spots) {
      const res = await spot.send(Object.assign({}, config, {
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
    const spots = Object.values(s.spots).filter(({id}) => !stack.includes(id))
    for (const spot of spots) {
      const asked = await spot.ask(subject, {stack})
      if (asked) {
        return asked
      }
    }
    return null
  }
}

Object.assign(WSpot, {newId})

module.exports = WSpot
