var argumentsVerify = require('arguments-verify')
var errorHandler = require('./core/error-handler.js')

function IterumBuilder (options) {
    var constructors = options.constructors
    function Iterum (generator) {
        var params
        if (!(this instanceof Iterum)) {
            return createInstance.apply(null, concatValueAndArray(Iterum, arguments))
        }
        argumentsVerify([['Function', Iterum]], arguments, errorHandler, 'Iterum')
        if (typeof generator === 'function') {
            params = [].slice.call(arguments, 1)
            this.generator = transformGenerator(generator, params, this)
        } else {
            this.generator = generator.generator
        }
    }

    Object.keys(constructors).forEach(function (constructorName) {
        Iterum[constructorName] = constructors[constructorName]({
            fnName: constructorName,
            validate: argumentsVerify,
            handler: errorHandler
        }, Iterum)
    })

    var methods = options.methods
    Object.keys(methods).forEach(function (methodName) {
        Iterum.prototype[methodName] = methods[methodName](iterumStateCreator, {
            fnName: methodName,
            validate: argumentsVerify,
            handler: errorHandler
        }, Iterum)
    })

    function transformGenerator (generator, params, iterum) {
        var rawGenerator = generator.bind.apply(generator, concatValueAndArray(iterum, params))
        return function () {
            var iterator = rawGenerator()
            var stack = []

            return {
                next: next
            }

            function next () {
                var state
                var pop
                var push
                do {
                    state = iterator.next()
                    var value = state.value
                    var done = state.done
                    pop = done && stack.length > 0
                    push = !done && value instanceof Iterum
                    if (pop) {
                        iterator = stack.pop()
                    } else if (push) {
                        stack.push(iterator)
                        iterator = value.build()()
                    }
                } while (pop || push)
                return state
            }
        }
    }

    return Iterum
}

function iterumStateCreator (iterum) {
    return {
        iterator: iterum.generator(),
        iterum: iterum,
        index: 0
    }
}

function createInstance (ctor) {
    return new (Function.prototype.bind.apply(ctor, arguments))
}

function concatValueAndArray (value, args) {
    var array = [value]
    array.push.apply(array, args)
    return array
}

module.exports = IterumBuilder
