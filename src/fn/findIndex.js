function findIndex (validator) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        let index = 0
        for (let val of this) {
            if (cb.call(context || this, val, index, this)) {
                return index
            }
            ++index
        }
        return -1
    }
}

module.exports = findIndex
