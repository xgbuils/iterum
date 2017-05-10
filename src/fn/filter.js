const entriesGen = require('../core/entriesGen')
const validation = [[], ['Function']]

function* filter (iterable, cb, context) {
    for (const [index, val] of entriesGen(iterable)) {
        if (cb.call(context, val, index, iterable)) {
            yield val
        }
    }
}

module.exports = {
    gen: filter,
    validation
}
