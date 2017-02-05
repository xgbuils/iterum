const validation = [['Number'], ['Number'], ['Number', 'Undefined']]

function* range (a, b, inc = 1) {
    const sign = Math.sign(inc)
    let diff = b - a
    for (let i = a; diff * sign >= 0; i += inc) {
        yield i
        diff -= inc
    }
}

module.exports = {
    gen: range,
    validation
}
