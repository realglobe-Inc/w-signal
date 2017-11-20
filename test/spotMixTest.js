/**
 * Test for spotMix.
 * Runs with mocha.
 */
'use strict'

const spotMix = require('../lib/mixins/spotMix')
const {ok, equal, deepEqual} = require('assert')

describe('spot-mix', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const SpotMixed = spotMix(class {})

    const instance = new SpotMixed()
    instance.$$setSpot('a', {name: 'a'})
    instance.$$setSpot('b', {name: 'b'})
    instance.$$setSpot('c', {name: 'c'})
    instance.$$setSpot('d', {name: 'd'})

    deepEqual(
      instance.$$listSpots({
        prior: ['c', 'd'],
        excludes: ['b']
      }),
      [{name: 'c'}, {name: 'd'}, {name: 'a'}]
    )
  })
})

/* global describe, before, after, it */
