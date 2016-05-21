var nextState = require('./next-state.js')

function eagerMethodFactory (method) {
    return function (iterumStateCreator, validator) {
        return function (cb) {
            var iterum = this
            var iterumState = iterumStateCreator(this)
            var state
            var values = []
            while (!(state = nextState(iterumState, validator)).done) {
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
