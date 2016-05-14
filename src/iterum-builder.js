function IterumBuilder (options) {
    var generators = options.generators
    function Iterum (generator) {
        if (!(this instanceof Iterum)) {
            return createInstance.apply(null, concatValueAndArray(Iterum, arguments))
        }
        if (typeof generator === 'function') {
            var params = [].slice.call(arguments, 1)
            this.generator = generator.bind.apply(generator, concatValueAndArray(null, params))
        } else {
            var fn = generators[generator.type]
            this.generator = fn.bind.apply(fn, concatValueAndArray(this, generator.args))
        }
    }

    Object.keys(generators).forEach(function (generatorName) {
        Iterum[generatorName] = function () {
            return {
                type: generatorName,
                args: [].slice.call(arguments)
            }
        }
    })

    var methods = options.methods
    Object.keys(methods).forEach(function (methodName) {
        Iterum.prototype[methodName] = methods[methodName](Iterum)
    })

    return Iterum
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
