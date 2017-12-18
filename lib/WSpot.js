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
  m.subjectMix,
  m.cacheMix,
  m.spotMix
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
    return new Proxy({}, {
      get (target, name) {
        if (target.hasOwnProperty(name)) {
          return target[name]
        }
        const isReserved = ['then', 'catch', 'constructor', 'valueOf', 'inspect', 'toString'].includes(name)
        if (isReserved) {
          return target[name]
        }
        const verb = String(name)

        async function methodProxy (...params) {
          const res = await s.send({
            method: [subject, verb].join('.'),
            params,
            id: newId(),
            w: {
              subject,
              verb,
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

        return methodProxy
      }
    })
  }

  /**
   * Connect to another spot
   * @param {WSpot} spot
   * @returns {Promise.<void>}
   */
  async connect (spot) {
    const s = this
    const {id} = spot
    const isKnown = s.$$getSpot(id)
    if (isKnown) {
      return
    }
    s.$$setSpot(id, spot)
    await
      spot.connect(s)
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
    const spot = s.$$getSpot(id)
    if (!spot) {
      return
    }
    s.$$delSpot(id)
    await
      spot.disconnect(s.id)
  }

  /**
   * Send message
   * @param config
   * @returns {Promise.<*>}
   */
  async send (config = {}) {
    const s = this
    const {subject, verb, stack = [], object} = config.w
    if (s.$$hasSubject(subject)) {
      return await
        s.$$invokeSubject(subject, verb, object)
    }
    stack.push(s.id)

    const spots = s.$$listSpots({
      prior: [s.$$subjectSpotCache.get(subject)].filter(Boolean),
      excludes: stack
    })
    const sending = Object.assign({}, config, {
      w: {subject, verb, stack, object}
    })
    for (const spot of spots) {
      const res = await
        spot.send(sending)
      if (res) {
        s.$$subjectSpotCache.set(subject, spot.id)
        return res
      }
    }
    return null
  }

}

Object.assign(WSpot, {newId})

module.exports = WSpot
