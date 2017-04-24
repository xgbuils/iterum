const findEntryFn = require('../core/findEntryFn')
const validation = [['Function']]

function some (cb, context) {
    return !!findEntryFn
        .call(this, cb, context)
}

module.exports = {
    fn: some,
    validation
}
