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
        value: entriesGen
    })
    Object.defineProperty(Iterum, 'entries', {
        value (iterable) {
            return entriesGen.call(typeVerify(iterable, [Iterable]) ? iterable : [])
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
                const iterum = IterumConstructor(typeVerify(iterable, [Iterable]) ? iterable : [])
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
