'use strict'

const {VerbSpec} = require('w-constants')

exports.validateVerbName = function validateVerbName (verbName) {
  const isReserved = VerbSpec.RESERVED_NAMES.split(',').includes(verbName)
  if (isReserved) {
    throw new Error(`[WSignal] You can not use verb "${verbName}" because it is reserved`)
  }
}