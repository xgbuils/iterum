function IterumBuilder (options) {
    var constructors = options.constructors
    function Iterum (constructor) {
        var nextConstructor = constructors[constructor.type]
        if (typeof constructor === 'function') {
            this.next = constructor
        } else if (nextConstructor) {
            this.next = nextConstructor.apply(null, constructor.args)
        }
    }

    Iterum.Build = {}

    Object.keys(options.constructors).forEach(function (constructorName) {
        Iterum.Build[constructorName] = function () {
            return {
                type: constructorName,
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
