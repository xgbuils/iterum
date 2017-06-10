module.exports = function* combinations (iterarray, n) {
    const length = n - 1
    let pos = length
    if (n === 0) {
        yield this([])
        return
    } else if (n < 0 || !iterarray.has(pos)) {
        return
    }
    const steps = Array(n).fill(0)
    yield this(toItem(iterarray, steps))
    while (iterarray.has((steps[pos] || 0) + n)) {
        if (pos < 0) {
            ++pos
        } else if (pos === length || steps[pos] < steps[pos + 1]) {
            ++steps[pos]
            yield this(toItem(iterarray, steps))
            --pos
        } else {
            steps[pos] = 0
            ++pos
        }
    }
}

function toItem (iterarray, steps) {
    return steps.map((step, index) => iterarray.nth(step + index))
}
