const findEntry = require('./findEntry')
const validation = [['Function']]

function find (cb, context) {
    const entry = findEntry.fn
        .call(this, cb, context)
    return entry && entry[1]
}

module.exports = {
    fn: find,
    validation
}
