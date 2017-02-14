const validation = [['Function']]
const entries = require('./entries')

function findEntry (cb, context) {
    for (const [index, val] of entries.gen.call(this)) {
        if (cb.call(context || this, val, index, this)) {
            return [index, val]
        }
    }
}

module.exports = {
    fn: findEntry,
    validation
}
