const entriesGen = require('../core/entriesGen')

module.exports = function* map (iterable, cb) {
    for (const [index, val] of entriesGen(iterable)) {
        yield cb(val, index, iterable)
    }
}
