var argumentsVerify = require('arguments-verify')
var errorHandler = require('./core/error-handler.js')

function IterumBuilder (options) {
    var constructors = options.constructors
    function Iterum (generator, ...args) {
        if (!(this instanceof Iterum)) {
            return new Iterum(generator, ...args)
        }
        //argumentsVerify([['Function', Iterum]], arguments, errorHandler, 'Iterum')
        if (generator instanceof Iterum) {
            this[Symbol.Iterator] = generator[Symbol.Iterator]
        } else if (typeof generator === 'function') {
            this[Symbol.Iterator] = transformGenerator(generator, args, this)
        } else {
            this[Symbol.Iterator] = transformGenerator(generator[Symbol.Iterator], args, this)
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
        var rawGenerator = generator.bind(iterum, ...params)
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
        iterator: iterum[Symbol.Iterator](),
        iterum: iterum,
        index: 0
    }
}

module.exports = IterumBuilder
