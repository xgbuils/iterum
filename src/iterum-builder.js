var argumentsValidator = require('./core/arguments-validator.js')

function IterumBuilder (options) {
    var generators = options.generators
    function Iterum (generator) {
        var params
        var context = {
            validate: argumentsValidator
        }
        if (!(this instanceof Iterum)) {
            return createInstance.apply(null, concatValueAndArray(Iterum, arguments))
        }
        if (typeof generator === 'function') {
            params = [].slice.call(arguments, 1)
            context.name = generator.name
        } else if (generator instanceof IterumConstructor) {
            params = generator.args
            context.name = generator.type
            generator = generators[generator.type]
        }
        this.generator = generator.bind.apply(generator, concatValueAndArray(context, params))
    }

    Object.keys(generators).forEach(function (generatorName) {
        Iterum[generatorName] = function () {
            return new IterumConstructor(generatorName, [].slice.call(arguments))
        }
    })

    var methods = options.methods
    Object.keys(methods).forEach(function (methodName) {
        Iterum.prototype[methodName] = methods[methodName](Iterum, function (iterum, Iterum) {
            return {
                iterator: iterum.generator(),
                stack: [],
                iterum: iterum,
                index: 0,
                Iterum: Iterum,
                IterumConstructor: IterumConstructor
            }
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
