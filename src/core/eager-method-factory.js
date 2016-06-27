function eagerMethodFactory (method) {
    return function () {
        return function (cb) {
            var iterum = this
            var iterator = this.generator()
            var state
            var values = []
            while (!(state = iterator.next()).done) {
                values.push(state.value)
            }
            var args = [].slice.call(arguments).map(function (arg) {
                return typeof arg !== 'function' ? arg : function () {
                    var args = [].slice.apply(arguments).map(function (arg) {
                        return arg === values ? iterum : arg
                    })
                    return cb.apply(this, args)
                }
            })
            return method ? method.apply(values, args) : values
        }
    }
}

module.exports = eagerMethodFactory
