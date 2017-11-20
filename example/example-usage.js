'use strict'

const wSpot = require('w-spot')

async function tryExample () {
  // Create multiple spot
  const NewYork = wSpot()
  const HongKong = wSpot()
  const Japan = wSpot()

  {
    class Person {
      async hi (msg) {
        return `hi, ${msg}`
      }
    }

    // Create a instance to a spot
    const john = NewYork.load(Person, 'jp.realglobe.new-york.john')
    await john.hi('I am in NewYork!')
  }

  // Connect each spot
  await Japan.connect(HongKong)
  await HongKong.connect(NewYork)

  {
    // Use remote instance
    const john = Japan.use('jp.realglobe.new-york.john')
    await john.hi('Calling from Japan!')
  }

}

tryExample().catch((err) => console.error(err))
