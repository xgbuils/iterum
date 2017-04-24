const findEntryFn = require('../core/findEntryFn')
const validation = [['Function']]

function findIndex (cb, context) {
    const entry = findEntryFn
        .call(this, cb, context)
    return entry ? entry[0] : -1
}

module.exports = {
    fn: findIndex,
    validation
}
