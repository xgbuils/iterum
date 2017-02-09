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
                generator = object[Symbol.iterator].bind(object)
            } else if (typeof object === 'function') {
                generator = object
            } else {
                generator = object[Symbol.iterator].bind(object)
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
            value (...args) {
                const {gen, validation} = constructors[constructorName]
                argumentsVerify(validation, args, errorHandler, constructorName)
                return IterumConstructor(Iterum)(gen.bind(Iterum, ...args))
            }
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

    return Iterum
}

module.exports = factory
