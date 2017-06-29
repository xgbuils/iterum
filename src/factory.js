const argumentsVerify = require('arguments-verify')
const typeVerify = require('type-verify')
const Iterable = require('./internal/iterable')
const errorHandler = require('./internal/error-handler.js')

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
            value (...args) {
                const {fn, validation} = methods[methodName]
                const {length} = validation
                const processedArgs = args.slice(0, length)
                argumentsVerify(validation || [[]], processedArgs, errorHandler, methodName)
                return fn.call(IterumConstructor, ...args)
            }
        })
        Object.defineProperty(Iterum.prototype, methodName, {
            value (...args) {
                const {fn, validation} = methods[methodName]
                const {length} = validation
                const processedArgs = args.slice(0, length - 1)
                argumentsVerify((validation || []).slice(0, -1), args, errorHandler, methodName)
                return fn.call(IterumConstructor, ...processedArgs, this)
            }
        })
    })

    return Iterum
}

module.exports = factory
