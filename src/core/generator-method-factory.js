function generatorMethodFactory (Iterum, iterumStateCreator, defaultArgs, next, transform) {
    return function (...args) {
        var iterum = this
        args = defaultArgs(...args)
        return Iterum(function () {
            var existTransform = typeof transform === 'function'
            var iterumState = iterumStateCreator(iterum)
            return {
                next: next.bind(iterumState, existTransform ? transform.call(iterumState, args) : args)
            }
        })
    }
}

module.exports = generatorMethodFactory
