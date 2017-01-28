function eagerMethodFactory (method, index) {
    return function () {
        return function (...args) {
            var iterum = this
            var values = [...iterum[Symbol.iterator]()]
            var indexCallback = args.findIndex(arg => typeof arg === 'function')
            var cb = args[indexCallback]
            args[indexCallback] = function (...args) {
                args[index] = iterum
                return cb.apply(this, args)
            }
            return method ? method.apply(values, args) : values
        }
    }
}

module.exports = eagerMethodFactory
