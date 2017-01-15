function eagerMethodFactory (method) {
    return function () {
        return function (...args) {
            var cb = args[0]
            var iterum = this
            var iterator = this[Symbol.Iterator]()
            var state
            var values = []
            while (!(state = iterator.next()).done) {
                values.push(state.value)
            }
            args = args.map(function (arg) {
                return typeof arg !== 'function' ? arg : function (...args) {
                    return cb.apply(this, args.map(function (arg) {
                        return arg === values ? iterum : arg
                    }))
                }
            })
            return method ? method.apply(values, args) : values
        }
    }
}

module.exports = eagerMethodFactory
