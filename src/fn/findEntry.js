function findEntry (validator) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        let index = 0
        for (let val of this) {
            if (cb.call(context || this, val, index, this)) {
                return [index, val]
            }
            ++index
        }
    }
}

module.exports = findEntry
