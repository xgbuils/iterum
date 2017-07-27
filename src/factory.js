const argumentsVerify = require('./internal/argumentsVerify')
const isIterable = require('./internal/isIterable')

function factory (options) {
    function Iterum (iterable) {
        argumentsVerify([{
            predicate: isIterable,
            type: 'iterable'
        }], [iterable])
        return IterumConstructor(iterable)
    }

    function IterumConstructor (object) {
        let generator
        if (isIterable(object)) {
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
    const define = function (object, methodName, method) {
        Object.defineProperty(object, methodName, {
            value: method
        })
    }

    Object.keys(staticMethods).forEach(function (staticMethodName) {
        const {fn, validation} = staticMethods[staticMethodName]
        define(Iterum, staticMethodName, function (...args) {
            argumentsVerify(validation, args)
            return fn.call(IterumConstructor, ...args)
        })
    })

    Object.keys(methods).forEach(function (methodName) {
        const {fn, validation, binary} = methods[methodName]
        const {length} = validation
        if (binary) {
            define(Iterum, methodName, function (first, second) {
                argumentsVerify(validation, [second, first])
                return fn.call(IterumConstructor, second, first)
            })
        } else {
            define(Iterum, methodName, curry(function (...args) {
                argumentsVerify(validation, args)
                return fn.call(IterumConstructor, ...args)
            }, length))
        }
        define(Iterum.prototype, methodName, function (...args) {
            const processedArgs = args.slice(0, length - 1)
            argumentsVerify(validation.slice(0, -1), args)
            return fn.call(IterumConstructor, ...processedArgs, this)
        })
    })

    return Iterum
}

function curry (fn, length = fn.length) {
    return function (...args) {
        const diff = length - args.length
        return diff > 0
            ? curry(fn.bind(null, ...args), diff)
            : fn(...args)
    }
}

module.exports = factory
