const entriesGen = require('../core/entriesGen')
const validation = [[], ['Function']]

function* map (iterable, cb, context) {
    for (const [index, val] of entriesGen(iterable)) {
        yield cb.call(context, val, index, iterable)
    }
}

module.exports = {
    gen: map,
    validation
}
