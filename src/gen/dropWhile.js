const entriesGen = require('../core/entriesGen')

module.exports = function* dropWhile (iterable, cb, context) {
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
