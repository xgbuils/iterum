module.exports = function (cb, initialValue, iterable) {
    return [...iterable].reduce((acc, val) => cb(acc, val), initialValue)
}
