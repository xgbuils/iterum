var nextValue = require('./next-value')

module.exports = function (value) {
    return nextValue(value, false)
}
