function IterumBuilder (options) {
    var generators = options.generators
    function Iterum (generator) {
        if (!(this instanceof Iterum)) {
            return createInstance.apply(null, concatValueAndArray(Iterum, arguments))
        }
        if (typeof generator === 'function') {
            var params = [].slice.call(arguments, 1)
            this.generator = generator.bind.apply(generator, concatValueAndArray(null, params))
        } else if (generator instanceof IterumConstructor) {
            var fn = generators[generator.type]
            this.generator = fn.bind.apply(fn, concatValueAndArray(this, generator.args))
        }
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
