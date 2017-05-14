const entriesGen = require('../core/entriesGen')

module.exports = function* filter (iterable, cb, context) {
    for (const [index, val] of entriesGen(iterable)) {
        if (cb.call(context, val, index, iterable)) {
            yield val
        }
    }
}
