'use strict'

const wSignal = require('w-signal')

async function tryExample () {
  const signal01 = wSignal()
  const signal02 = wSignal()
  const signal03 = wSignal()

  {
    class Person {
      async hi (msg) {
        return `hi, ${msg}`
      }
    }

    const john = signal01.load(Person, 'john')
    await john.hi('Calling from local!')
  }

  await signal03.connect(signal02)
  await signal02.connect(signal01)

  {
    const john = signal03.use('john')
    await john.hi('Calling from remote!')
  }

}

tryExample().catch((err) => console.error(err))
