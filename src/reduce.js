module.exports = function (iterable, cb, initialValue) {
    return [...iterable].reduce((acc, val) => cb(acc, val), initialValue)
}
