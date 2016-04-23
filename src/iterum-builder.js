function IterumBuilder (methods) {
    function Iterum (constructor) {
        var nextConstructor = methods[constructor.type]
        if (typeof constructor === 'function') {
            this.next = constructor
        } else if (nextConstructor) {
            this.next = nextConstructor.apply(null, constructor.args)
        }
    }

    Object.keys(methods).forEach(function (methodName) {
        Iterum[methodName] = function () {
            return {
                type: methodName,
                args: [].slice.call(arguments)
            }
        }
    })

    Iterum.prototype.map = function (cb, context) {
        var index = 0
        var iterator = this
        context = context || this
        return new Iterum(function () {
            var state = context.next()
            var done = state.done
            var result = {
                value: done ? undefined : cb(state.value, index, iterator),
                done: done
            }
            ++index
            return result
        })
    }

    return Iterum
}

module.exports = IterumBuilder
