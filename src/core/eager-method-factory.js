function eagerMethodFactory (method, index) {
    return {
        fn (...args) {
            const iterum = this
            const values = [...iterum]
            const indexCallback = args.findIndex(arg => typeof arg === 'function')
            const cb = args[indexCallback]
            args[indexCallback] = function (...args) {
                args[index] = iterum
                return cb.apply(this, args)
            }
            return method.apply(values, args)
        }
    }
}

module.exports = eagerMethodFactory
