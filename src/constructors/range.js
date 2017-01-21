function Range (validator, Iterum) {
    return function (a, b, inc = 1) {
        validator.validate([['Number'], ['Number'], ['Number', 'Undefined']], [a, b, inc])
        return Iterum(function* () {
            const sign = Math.sign(inc)
            let diff = b - a
            for (let i = a; diff * sign >= 0; i += inc) {
                yield i
                diff -= inc
            }
        })
    }
}

module.exports = Range
