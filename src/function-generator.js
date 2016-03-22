var nextValue = require('./core/next-value')

function FunctionGenerator (options) {
    var context = {}
    var value = options.init.call(context)
    return {
        next: function () {
            var done = options.stop.call(context, value)
            var result = nextValue(done ? undefined : value, done)
            value = options.next.call(context, value)
            return result
        }
    }
}

module.exports = FunctionGenerator
