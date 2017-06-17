const baseUniq = require('../core/baseUniq')

module.exports = function uniqBy (iterable, cb) {
    return this(baseUniq(iterable, new Set(), cb))
}
