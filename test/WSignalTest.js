/**
 * Test for WSignal.
 * Runs with mocha.
 */
'use strict'

const WSignal = require('../lib/WSignal')
const {ok, equal} = require('assert')

describe('w-signal', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const receiver = new WSignal()
    const proxy = new WSignal()
    const sender = new WSignal()

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
    }

  })
})

/* global describe, before, after, it */
