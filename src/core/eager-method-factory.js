function eagerMethodFactory (method, index) {
    return {
        fn (iterable, ...args) {
            const values = [...iterable]
            const indexCallback = args.findIndex(arg => typeof arg === 'function')
            const cb = args[indexCallback]
            args[indexCallback] = function (...args) {
                args[index] = iterable
                return cb.apply(this, args)
            }
            return method.apply(values, args)
        }
    }
}

module.exports = eagerMethodFactory
