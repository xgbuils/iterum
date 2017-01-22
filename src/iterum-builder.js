var argumentsVerify = require('arguments-verify')
var errorHandler = require('./core/error-handler.js')

function IterumBuilder (options) {
    var constructors = options.constructors
    function Iterum (iterable, ...args) {
        if (!(this instanceof Iterum)) {
            return new Iterum(iterable, ...args)
        }
        const entries = iterable.entries
        //argumentsVerify([['Function', Iterum]], arguments, errorHandler, 'Iterum')
        if (iterable instanceof Iterum) {
            this[Symbol.iterator] = iterable[Symbol.iterator]
        } else if (typeof iterable === 'function') {
            this[Symbol.iterator] = transformGenerator(iterable, args, this)
        } else {
            this[Symbol.iterator] = transformGenerator(iterable[Symbol.iterator], args, iterable)
        }
        this.entries = typeof entries === 'function'
            ? entries.bind(iterable)
            : defaultEntries
    }

    function* defaultEntries () {
        let index = 0
        for (let val of this) {
            yield [index, val]
            ++index
        }
    }

    Object.keys(constructors).forEach(function (constructorName) {
        Iterum[constructorName] = constructors[constructorName]({
            fnName: constructorName,
            validate: argumentsVerify,
            handler: errorHandler
        }, Iterum)
    })

    var methods = options.methods
    Object.keys(methods).forEach(function (methodName) {
        Iterum.prototype[methodName] = methods[methodName]({
            fnName: methodName,
            validate: argumentsVerify,
            handler: errorHandler
        }, Iterum)
    })

    function transformGenerator (generator, params, iterum) {
        var rawGenerator = generator.bind(iterum, ...params)
        return function () {
            var iterator = rawGenerator()
            var stack = []

            return {
                next: next
            }

            function next () {
                var state
                var pop
                var push
                do {
                    state = iterator.next()
                    var value = state.value
                    var done = state.done
                    pop = done && stack.length > 0
                    push = !done && value instanceof Iterum
                    if (pop) {
                        iterator = stack.pop()
                    } else if (push) {
                        stack.push(iterator)
                        iterator = value.build()()
                    }
                } while (pop || push)
                return state
            }
        }
    }

    return Iterum
}

module.exports = IterumBuilder
