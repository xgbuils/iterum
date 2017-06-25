module.exports = function (iterable, cb, initialValue) {
    return [...iterable].reduceRight((acc, val) => cb(acc, val), initialValue)
}
