const baseEntries = require('../core/baseEntries')

module.exports = function (iterable, cb) {
    for (const [index, val] of baseEntries(iterable)) {
        if (cb(val, index, iterable)) {
            return [index, val]
        }
    }
}
