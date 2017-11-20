/**
 * Test for WSpot.
 * Runs with mocha.
 */
'use strict'

const WSpot = require('../lib/WSpot')
const {ok, equal} = require('assert')

describe('w-spot', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const receiver = new WSpot()
    const proxy = new WSpot()
    const sender = new WSpot()

    {
      class Subject01 {
        async hi (msg) {
          return `hi, ${msg}`
        }
      }

      const subject01 = receiver.load(Subject01, 'subject01')
      await subject01.hi('Calling from local!')
    }

    await sender.connect(proxy)
    await proxy.connect(receiver)

    {
      const subject01 = await sender.use('subject01')
      equal(
        await subject01.hi('Calling from remote!'),
        'hi, Calling from remote!'
      )
      await subject01.hi('Calling from remote again!')
      await subject01.hi('Calling from remote again!')
    }

    await proxy.disconnect(receiver)
  })
})

/* global describe, before, after, it */
