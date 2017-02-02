const findEntry = require('./findEntry')
const validation = [['Function']]

function findIndex (cb, context) {
    const entry = findEntry.fn
        .call(this, cb, context)
    return entry ? entry[0] : -1
}
module.exports = {
    fn: findIndex,
    validation
}
