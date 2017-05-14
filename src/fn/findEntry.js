const entries = require('../gen/entries')

module.exports = function (iterable, cb) {
    for (const [index, val] of entries(iterable)) {
        if (cb(val, index, iterable)) {
            return [index, val]
        }
    }
}
