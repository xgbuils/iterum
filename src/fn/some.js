const findEntry = require('./findEntry')
const validation = [['Function']]

function some (cb, context) {
    return !!findEntry.fn
        .call(this, cb, context)
}

module.exports = {
    fn: some,
    validation
}
