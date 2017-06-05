module.exports = function drop (iterarray, n) {
    return this(iterarray.slice(n, Infinity))
}
