module.exports = function* range (start = 0, end = Infinity, inc = 1) {
    const sign = Math.sign(inc)
    let diff = end - start
    for (let i = start; diff * sign >= 0; i += inc) {
        yield i
        diff -= inc
    }
}
