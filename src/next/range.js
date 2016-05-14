function Range (a, b, inc) {
    inc || (inc = 1)
    var sign = inc > 0 ? 1 : -1
    var value = a - inc
    validate(a, b)
    return {
        next: function () {
            value += inc
            var done = (b - value) * sign < 0
            return {
                value: done ? undefined : value,
                done: done
            }
        }
    }
}

var errors = {
    badParameter: 'Range: ${nth} parameter ${value} is not a number'
}

function throwException (type, params) {
    var msg = errors[type].replace(/\$\{([^}]*)\}/g, function (m, op) {
        return params[op]
    })
    throw new TypeError(msg)
}

function validate (a, b) {
    if (!(typeof a === 'number')) {
        throwException('badParameter', {nth: 'first', value: a})
    } else if (!(typeof b === 'number')) {
        throwException('badParameter', {nth: 'second', value: b})
    }
}

module.exports = Range
