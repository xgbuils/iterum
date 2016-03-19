var FunctionGenerator = require('./function-generator')

function RangeGenerator (a, b, inc) {
    inc || (inc = 1)
    var sign = inc > 0 ? 1 : -1
    return FunctionGenerator({
        init: function () {
            return a
        },
        next: function (i) {
            return i + inc
        },
        stop: function (i) {
            return (b - i) * sign < 0
        }
    })
}

module.exports = RangeGenerator
