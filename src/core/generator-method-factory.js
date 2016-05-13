function generatorMethodFactory (Iterum, defaultArgs, next, transform) {
    return function () {
        var iterum = this
        var oldGenerator = this.generator
        var args = defaultArgs.apply(this, arguments)
        return Iterum(function () {
            var iterator = oldGenerator()
            var existTransform = typeof transform === 'function'
            var counter = {
                index: 0
            }
            return {
                next: next.bind(context, iterator, iterum, counter, existTransform ? transform(args) : args)
            }
        })
    }
}

module.exports = generatorMethodFactory
