const argumentsVerify = require('arguments-verify')
const typeVerify = require('type-verify')
const entriesGen = require('./core/entriesGen')
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

    Object.defineProperty(Iterum.prototype, 'entries', {
        value () {
            return entriesGen(this)
        }
    })
    Object.defineProperty(Iterum, 'entries', {
        value (iterable) {
            return entriesGen(typeVerify(iterable, [Iterable]) ? iterable : [])
        }
    })

    const {staticMethods, methods} = options

    Object.keys(staticMethods).forEach(function (staticMethodName) {
        Object.defineProperty(Iterum, staticMethodName, {
            value (...args) {
                const {gen, validation} = staticMethods[staticMethodName]
                argumentsVerify(validation, args, errorHandler, staticMethodName)
                return IterumConstructor(gen.bind(Iterum, ...args))
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
                    ? fn(iterum, ...args)
                    : IterumConstructor(gen.bind(null, iterum, ...args))
            }
        })
        Object.defineProperty(Iterum.prototype, methodName, {
            value (...args) {
                const {fn, gen, validation, wrapResult} = methods[methodName]
                argumentsVerify((validation || []).slice(1), args, errorHandler, methodName)
                const result = gen
                    ? gen.bind(null, this, ...args)
                    : fn(this, ...args)
                return gen || wrapResult
                    ? IterumConstructor(result)
                    : result
            }
        })
    })

    return Iterum
}

module.exports = factory
