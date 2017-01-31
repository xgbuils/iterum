const argumentsVerify = require('arguments-verify')
const errorHandler = require('./core/error-handler.js')

function factory (options) {
    class Iterable {
        static [Symbol.hasInstance] (instance) {
            return instance != null && typeof instance[Symbol.iterator] === 'function'
        }
    }

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

    const {constructors} = options
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
        * value () {
            let index = 0
            for (const val of this) {
                yield [index, val]
                ++index
            }
        }
    })

    const {methods} = options
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
        const rawGenerator = generator.bind(iterum)
        return function* () {
            let iterator = rawGenerator()
            const stack = []

            while (true) {
                let done
                let value
                let pop
                let push
                do {
                    const state = iterator.next()
                    ;({value, done} = state)
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
