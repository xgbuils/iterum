module.exports = function (iterable) {
    return iterable != null && typeof iterable[Symbol.iterator] === 'function'
}
