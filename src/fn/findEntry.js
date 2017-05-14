const entriesGen = require('../core/entriesGen')

module.exports = function (iterable, cb, context) {
    for (const [index, val] of entriesGen(iterable)) {
        if (cb.call(context || iterable, val, index, iterable)) {
            return [index, val]
        }
    }
}
