var argumentsVerify = require('arguments-verify')
var errorHandler = require('./core/error-handler.js')

function factory (options) {
    class Iterable {
        static [Symbol.hasInstance] (instance) {
            return instance != null && typeof instance[Symbol.iterator] === 'function'
        }
    }
    var constructors = options.constructors
    function Iterum (iterable) {
        argumentsVerify([[Iterable]], [iterable], errorHandler, 'Iterum')
        return IterumConstructor(Iterum)(iterable)
    }

    function IterumConstructor (IterumClass) {
        return function (object) {
            let generator
            if (object instanceof IterumClass) {
                generator = object[Symbol.iterator]
            } else if (typeof object === 'function') {
                generator = transformGenerator(object, this)
            } else {
                generator = transformGenerator(object[Symbol.iterator], object)
            }
            return Object.create(IterumClass.prototype, {
                [Symbol.iterator]: {
                    value: generator
                }
            })
        }
    }

    Object.keys(constructors).forEach(function (constructorName) {
        Object.defineProperty(Iterum, constructorName, {
            value: constructors[constructorName]({
                fnName: constructorName,
                validate: argumentsVerify,
                handler: errorHandler
            }, IterumConstructor(Iterum), Iterable)
        })
    })

    Object.defineProperty(Iterum.prototype, 'entries', {
        value: function* () {
            let index = 0
            for (let val of this) {
                yield [index, val]
                ++index
            }
        }
    })

    var methods = options.methods
    Object.keys(methods).forEach(function (methodName) {
        Object.defineProperty(Iterum.prototype, methodName, {
            value: methods[methodName]({
                fnName: methodName,
                validate: argumentsVerify,
                handler: errorHandler
            }, IterumConstructor(Iterum), Iterable)
        })
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

module.exports = factory
