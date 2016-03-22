var nextValue = require('../core/next-value')

function map (gen, cb, context) {
    var iterator
    var mapGenerator = function () {
        var args = [].slice.call(arguments)
        context = context || this
        iterator = gen.apply(context, args)
        var index = 0

        return {
            next: function () {
                var obj = iterator.next()
                var done = obj.done
                return nextValue(done ? undefined : cb.call(context, obj.value, index), done)
            }
        }
    }
    return mapGenerator
}

module.exports = map
