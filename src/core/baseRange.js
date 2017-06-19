module.exports = function* (start, end, inc = 1) {
    const sign = Math.sign(inc)
    let diff = end - start
    for (let i = start; diff * sign >= 0; i += inc) {
        yield i
        diff -= inc
    }
}
