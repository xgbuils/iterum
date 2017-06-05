const findIndex = require('./findIndex')

module.exports = function indexOf (iterable, e) {
    return findIndex(iterable, value => value === e)
}
