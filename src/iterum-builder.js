function IterumBuilder (options) {
    var generators = options.generators
    function Iterum (generator) {
        if (!(this instanceof Iterum)) {
            return new Iterum(generator)
        }
        if (typeof generator === 'function') {
            this.generator = generator
        } else {
            var fn = generators[generator.type]
            this.generator = fn.bind.apply(fn, [this].concat(generator.args))
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

module.exports = IterumBuilder
