function generatorMethodFactory (defaultArgs, next) {
    return function () {
        var oldGenerator = this.generator
        var args = defaultArgs.apply(this, arguments)
        var newGenerator = function () {
            var iterator = oldGenerator()
            var counter = {
                index: 0
            }
            return {
                next: next.bind(context, iterator, counter, args)
            }
        }
        this.generator = newGenerator
        return this
    }
}

module.exports = generatorMethodFactory
