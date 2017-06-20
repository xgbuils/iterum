const argumentsVerify = require('arguments-verify')
const typeVerify = require('type-verify')
const Iterable = require('./core/iterable')
const errorHandler = require('./core/error-handler.js')

function factory (options) {
    function Iterum (iterable) {
        argumentsVerify([[Iterable]], [iterable], errorHandler, 'Iterum')
        return IterumConstructor(iterable)
    }

    function IterumConstructor (object) {
        let generator
        if (typeVerify(object, [Iterable])) {
            generator = object[Symbol.iterator].bind(object)
        } else {
            generator = object
        }
        return Object.create(Iterum.prototype, {
            [Symbol.iterator]: {
                value: generator
            }
        })
    }

    const {staticMethods, methods} = options

    Object.keys(staticMethods).forEach(function (staticMethodName) {
        Object.defineProperty(Iterum, staticMethodName, {
            value (...args) {
                const {fn, validation} = staticMethods[staticMethodName]
                argumentsVerify(validation, args, errorHandler, staticMethodName)
                return fn.call(IterumConstructor, ...args)
            }
        })
    })

    Object.keys(methods).forEach(function (methodName) {
        Object.defineProperty(Iterum, methodName, {
            value (iterable, ...args) {
                const {fn, gen, validation} = methods[methodName]
                argumentsVerify(validation || [[]], [iterable, ...args], errorHandler, methodName)
                const iterum = IterumConstructor(typeVerify(iterable, [Iterable]) ? iterable : [])
                return fn
                    ? fn.call(IterumConstructor, iterum, ...args)
                    : IterumConstructor(gen.bind(IterumConstructor, iterum, ...args))
            }
        })
        Object.defineProperty(Iterum.prototype, methodName, {
            value (...args) {
                const {fn, gen, validation} = methods[methodName]
                argumentsVerify((validation || []).slice(1), args, errorHandler, methodName)
                return fn
                    ? fn.call(IterumConstructor, this, ...args)
                    : IterumConstructor(gen.bind(IterumConstructor, this, ...args))
            }
        })
    })

    return Iterum
}

module.exports = factory
