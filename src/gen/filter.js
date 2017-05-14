const entriesGen = require('../core/entriesGen')

module.exports = function* filter (iterable, cb) {
    for (const [index, val] of entriesGen(iterable)) {
        if (cb(val, index, iterable)) {
            yield val
        }
    }
}
