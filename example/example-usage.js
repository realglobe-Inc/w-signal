'use strict'

const wSpot = require('w-spot')

async function tryExample () {
  // Create multiple spot
  const newYork = wSpot()
  const hongKong = wSpot()
  const japan = wSpot()

  {
    class Person {
      async hi (msg) {
        return `hi, ${msg}`
      }
    }

    // Create a instance to a spot
    const john = newYork.load(Person, 'john')
    await john.hi('I am in NewYork!')
  }

  // Connect each spot
  await japan.connect(hongKong)
  await hongKong.connect(newYork)

  {
    // Use remote instance
    const john = japan.use('john')
    await john.hi('Calling from Japan!')
  }

}

tryExample().catch((err) => console.error(err))
