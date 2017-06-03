module.exports = function drop (iterarray, n = 1) {
    return this(iterarray.slice(n, Infinity))
}
