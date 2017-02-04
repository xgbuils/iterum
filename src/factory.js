const argumentsVerify = require('arguments-verify')
const Iterable = require('./core/iterable')
const errorHandler = require('./core/error-handler.js')

function factory (options) {
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

    Object.defineProperty(Iterum.prototype, 'entries', {
        * value () {
            let index = 0
            for (const val of this) {
                yield [index, val]
                ++index
            }
        }
    })

    const {constructors, eagerMethods, lazyMethods} = options

    Object.keys(constructors).forEach(function (constructorName) {
        Object.defineProperty(Iterum, constructorName, {
            value: constructors[constructorName]({
                fnName: constructorName,
                validate: argumentsVerify,
                handler: errorHandler
            }, IterumConstructor(Iterum), Iterable)
        })
    })

    Object.keys(eagerMethods).forEach(function (methodName) {
        Object.defineProperty(Iterum.prototype, methodName, {
            value (...args) {
                const {fn, validation} = eagerMethods[methodName]
                argumentsVerify(validation || [], args, errorHandler, methodName)
                return fn.call(this, ...args)
            }
        })
    })

    Object.keys(lazyMethods).forEach(function (methodName) {
        Object.defineProperty(Iterum.prototype, methodName, {
            value (...args) {
                const {gen, validation} = lazyMethods[methodName]
                argumentsVerify(validation, args, errorHandler, methodName)
                return IterumConstructor(Iterum)(gen.bind(this, ...args))
            }
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
