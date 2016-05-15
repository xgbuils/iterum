function generatorMethodFactory (Iterum, defaultArgs, next, transform) {
    return function () {
        var iterum = this
        var oldGenerator = this.generator
        var args = defaultArgs.apply(this, arguments)
        return Iterum(function () {
            var existTransform = typeof transform === 'function'
            var iterumState = {
                iterator: oldGenerator(),
                iterum: iterum,
                index: 0,
                stack: []
            }
            return {
                next: next.bind(null, iterumState, existTransform ? transform(args) : args)
            }
        })
    }
}

module.exports = generatorMethodFactory
