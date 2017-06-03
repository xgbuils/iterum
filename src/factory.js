const argumentsVerify = require('arguments-verify')
const typeVerify = require('type-verify')
const Iterable = require('./core/iterable')
const errorHandler = require('./core/error-handler.js')
const IterArray = require('iterarray')
const iterArrayKey = Symbol('IterArray key')

function factory (options) {
    function Iterum (iterable) {
        argumentsVerify([[Iterable]], [iterable], errorHandler, 'Iterum')
        return IterumConstructor(iterable)
    }

    function IterumConstructor (object) {
        const iterarray = new IterArray(object)
        return Object.create(Iterum.prototype, {
            [iterArrayKey]: {
                value: iterarray
            },
            [Symbol.iterator]: {
                value: iterarray[Symbol.iterator].bind(iterarray)
            }
        })
    }

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
                const iterarray = IterArray(typeVerify(iterable, [Iterable]) ? iterable : [])
                return fn
                    ? fn.call(IterumConstructor, iterarray, ...args)
                    : IterumConstructor(gen.bind(IterumConstructor, iterarray, ...args))
            }
        })
        Object.defineProperty(Iterum.prototype, methodName, {
            value (...args) {
                const {fn, gen, validation} = methods[methodName]
                argumentsVerify((validation || []).slice(1), args, errorHandler, methodName)
                return fn
                    ? fn.call(IterumConstructor, this[iterArrayKey], ...args)
                    : IterumConstructor(gen.bind(IterumConstructor, this[iterArrayKey], ...args))
            }
        })
    })

    return Iterum
}

module.exports = factory
