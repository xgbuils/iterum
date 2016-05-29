var argumentsVerify = require('arguments-verify')
var errorHandler = require('./core/error-handler.js')

function IterumBuilder (options) {
    var constructors = options.constructors
    function Iterum (generator) {
        var params
        var context = {
            validate: argumentsVerify
        }
        if (!(this instanceof Iterum)) {
            return createInstance.apply(null, concatValueAndArray(Iterum, arguments))
        }
        argumentsVerify([['Function', IterumConstructor]], arguments, errorHandler, 'Iterum')
        if (typeof generator === 'function') {
            params = [].slice.call(arguments, 1)
            context.name = generator.name
        } else {
            params = generator.args
            context.name = generator.type
            generator = constructors[generator.type]
        }
        this.generator = generator.bind.apply(generator, concatValueAndArray(context, params))
    }

    Object.keys(constructors).forEach(function (constructorName) {
        Iterum[constructorName] = function () {
            var validArgs = constructors[constructorName].validArgs || []
            argumentsVerify(validArgs, arguments, errorHandler, constructorName)
            return new IterumConstructor(constructorName, [].slice.call(arguments))
        }
    })

    var methods = options.methods
    Object.keys(methods).forEach(function (methodName) {
        Iterum.prototype[methodName] = methods[methodName](function (iterum) {
            return {
                iterator: iterum.generator(),
                stack: [],
                iterum: iterum,
                index: 0
            }
        }, {
            fnName: methodName,
            validate: argumentsVerify,
            handler: errorHandler,
            Iterum: Iterum,
            IterumConstructor: IterumConstructor
        })
    })

    return Iterum
}

function createInstance (ctor) {
    return new (Function.prototype.bind.apply(ctor, arguments))
}

function IterumConstructor (type, args) {
    this.type = type
    this.args = args
}

function concatValueAndArray (value, args) {
    var array = [value]
    array.push.apply(array, args)
    return array
}

module.exports = IterumBuilder
