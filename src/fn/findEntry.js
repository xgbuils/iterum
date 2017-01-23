function findEntry (validator) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        for (let [index, val] of this.entries()) {
            if (cb.call(context || this, val, index, this)) {
                return [index, val]
            }
        }
    }
}

module.exports = findEntry
