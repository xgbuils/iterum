const validation = [['Number'], ['Number', 'Undefined'], ['Number', 'Undefined']]

function* range (a, b, inc = 1) {
    const {length} = arguments // eslint-disable-line prefer-rest-params
    let [start, end] = [a, b]
    if (length === 1) {
        [start, end] = [0, a]
    }
    const sign = Math.sign(inc)
    let diff = end - start
    for (let i = start; diff * sign > 0; i += inc) {
        yield i
        diff -= inc
    }
}

module.exports = {
    gen: range,
    validation
}
