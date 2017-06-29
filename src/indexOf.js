const findIndex = require('./findIndex')

module.exports = function indexOf (e, iterable) {
    return findIndex(value => value === e, iterable)
}
