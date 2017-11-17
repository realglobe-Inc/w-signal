'use strict'

const wSignal = require('w-signal')

async function tryExample () {
  const receiver = wSignal()
  const proxy = wSignal()
  const sender = wSignal()

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
    const subject01 = sender.use('subject01')
    await subject01.hi('Calling from remote!')
  }

}

tryExample().catch((err) => console.error(err))
