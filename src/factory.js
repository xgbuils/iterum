var argumentsVerify = require('arguments-verify')
var errorHandler = require('./core/error-handler.js')

function IterumBuilder (options) {
    class Iterable {
        static [Symbol.hasInstance] (instance) {
            return instance != null && typeof instance[Symbol.iterator] === 'function'
        }
    }
    var constructors = options.constructors
    function Iterum (iterable) {
        if (!(this instanceof Iterum)) {
            return new Iterum(iterable)
        }
        //argumentsVerify([['Function', Iterable, Iterum]], [iterable], errorHandler, 'Iterum')
        if (iterable instanceof Iterum) {
            this[Symbol.iterator] = iterable[Symbol.iterator]
        } else if (typeof iterable === 'function') {
            this[Symbol.iterator] = transformGenerator(iterable, this)
        } else {
            this[Symbol.iterator] = transformGenerator(iterable[Symbol.iterator], iterable)
        }
    }

    Object.keys(constructors).forEach(function (constructorName) {
        Iterum[constructorName] = constructors[constructorName]({
            fnName: constructorName,
            validate: argumentsVerify,
            handler: errorHandler
        }, Iterum, Iterable)
    })

    Iterum.prototype.entries = function* () {
        let index = 0
        for (let val of this) {
            yield [index, val]
            ++index
        }
    }

    var methods = options.methods
    Object.keys(methods).forEach(function (methodName) {
        Iterum.prototype[methodName] = methods[methodName]({
            fnName: methodName,
            validate: argumentsVerify,
            handler: errorHandler
        }, Iterum, Iterable)
    })

    function transformGenerator (generator, iterum) {
        var rawGenerator = generator.bind(iterum)
        return function* () {
            let iterator = rawGenerator()
            let stack = []

            while (true) {
                let done
                let value
                let pop
                let push
                do {
                    const state = iterator.next()
                    value = state.value
                    done = state.done
                    pop = done && stack.length > 0
                    push = !done && value instanceof Iterum
                    if (pop) {
                        iterator = stack.pop()
                    } else if (push) {
                        stack.push(iterator)
                        iterator = value[Symbol.iterator]()
                    }
                } while (pop || push)
                if (done) {
                    return
                }
                yield value
            }
        }
    }

    return Iterum
}

module.exports = IterumBuilder
