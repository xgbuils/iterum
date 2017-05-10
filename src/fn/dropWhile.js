const entriesGen = require('../core/entriesGen')
const validation = [[], ['Function']]

function* dropWhile (iterable, cb, context) {
    let next = false
    for (const [index, val] of entriesGen(iterable)) {
        if (next) {
            yield val
        } else if (!cb.call(context, val, index, iterable)) {
            next = true
            yield val
        }
    }
}

module.exports = {
    gen: dropWhile,
    validation
}
