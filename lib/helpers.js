'use strict'

const uuid = require('uuid')

module.exports = {
  newId () {
    return uuid.v4()
  },
  getByNamepath (target, namepath, {separator = '.'} = {}) {
    const names = namepath.split(separator)
    const resolvedNames = []
    let result = target
    while (names.length > 1) {
      const name = names.shift()
      resolvedNames.push(name)
      result = result[name]
      if (!result) {
        throw new Error(`Invalid name path: ${resolvedNames.join(separator)}`)
      }
    }
    return result[names.shift()]
  },
  setByNamepath (target, namepath, value, {separator = '.'} = {}) {
    const names = namepath.split(separator)
    const resolvedNames = []
    while (names.length > 1) {
      const name = names.shift()
      resolvedNames.push(name)
      target = target[name]
      if (!target) {
        throw new Error(`Invalid name path: ${resolvedNames.join(separator)}`)
      }
    }
    target[names.shift()] = value
  },

  allMethodNames (instance) {
    const names = []
    const namesToIgnore = ['constructor']
    let {__proto__} = instance
    while (__proto__) {
      const {constructor} = __proto__
      if (constructor === Object) {
        break
      }
      const found = Object.getOwnPropertyNames(__proto__)
        .filter((name) => !namesToIgnore.includes(name))
        .filter((name) => {
          const descriptor = Object.getOwnPropertyDescriptor(__proto__, name)
          return descriptor.hasOwnProperty('value') // Ignore dynamic getter/setter
        })
        .filter((name) => typeof instance[name] === 'function')
      names.unshift(...found)
      __proto__ = __proto__.__proto__
    }
    return names
  }
}
