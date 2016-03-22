var nextValue = require('./core/next-value')

function ValueGenerator (value) {
    var done = false
    return {
        next: function () {
            var result = nextValue(done ? undefined : value, done)
            done = true
            return result
        }
    }
}

module.exports = ValueGenerator
