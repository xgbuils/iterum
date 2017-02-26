const argumentsVerify = require('arguments-verify')
const entries = require('./fn/entries')
const Iterable = require('./core/iterable')
const errorHandler = require('./core/error-handler.js')

function factory (options) {
    function Iterum (iterable) {
        argumentsVerify([[Iterable]], [iterable], errorHandler, 'Iterum')
        return IterumConstructor(iterable)
    }

    function IterumConstructor (object) {
        let generator
        if (object instanceof Iterable) {
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
        value: entries.gen
    })
    Object.defineProperty(Iterum, 'entries', {
        value (iterable) {
            return entries.gen.call(iterable instanceof Iterable ? iterable : [])
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
                argumentsVerify([[], ...(validation || [])], [iterable, ...args], errorHandler, methodName)
                const iterum = IterumConstructor(iterable instanceof Iterable ? iterable : [])
                return fn
                    ? fn.call(iterum, ...args)
                    : IterumConstructor(gen.bind(iterum, ...args))
            }
        })
        Object.defineProperty(Iterum.prototype, methodName, {
            value (...args) {
                const {fn, gen, validation} = methods[methodName]
                argumentsVerify(validation || [], args, errorHandler, methodName)
                return fn
                    ? fn.call(this, ...args)
                    : IterumConstructor(gen.bind(this, ...args))
            }
        })
    })

    return Iterum
}

module.exports = factory
