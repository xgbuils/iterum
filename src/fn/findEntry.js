const entriesGen = require('../core/entriesGen')

module.exports = function (iterable, cb) {
    for (const [index, val] of entriesGen(iterable)) {
        if (cb(val, index, iterable)) {
            return [index, val]
        }
    }
}
