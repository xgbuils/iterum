function generatorMethodFactory (Iterum, iterumStateCreator, defaultArgs, next, transform) {
    return function () {
        var iterum = this
        var args = defaultArgs.apply(this, arguments)
        return Iterum(function () {
            var existTransform = typeof transform === 'function'
            var iterumState = iterumStateCreator(iterum, Iterum)
            return {
                next: next.bind(null, iterumState, existTransform ? transform(args) : args)
            }
        })
    }
}

module.exports = generatorMethodFactory
