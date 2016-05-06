function generatorMethodFactory (defaultArgs, next, transform) {
    return function () {
        var oldGenerator = this.generator
        var args = defaultArgs.apply(this, arguments)
        var newGenerator = function () {
            var iterator = oldGenerator()
            var existTransform = typeof transform === 'function'
            var counter = {
                index: 0
            }
            return {
                next: next.bind(context, iterator, counter, existTransform ? transform(args) : args)
            }
        }
        this.generator = newGenerator
        return this
    }
}

module.exports = generatorMethodFactory
