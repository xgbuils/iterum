const entriesGen = require('./entriesGen')

module.exports = function (cb, iterable) {
    for (const [index, val] of entriesGen(iterable)) {
        if (cb(val, index, iterable)) {
            return [index, val]
        }
    }
}
