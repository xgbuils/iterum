module.exports = function take (iterarray, n = 1) {
    return this(iterarray.slice(0, n))
}
