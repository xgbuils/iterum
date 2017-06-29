module.exports = function (cb, initialValue, iterable) {
    return [...iterable].reduceRight((acc, val) => cb(acc, val), initialValue)
}
