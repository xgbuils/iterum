var indexs = {
    1: 'st',
    2: 'nd',
    3: 'rd'
}

var map = {
    type: function (type) {
        return /^[aeiou]/i.test(type) ? 'an ' + type : 'a ' + type
    },
    instance: function (type) {
        return 'an instance of ' + type
    }
}

function errorHandler (err) {
    if (err) {
        var expected = err.expected
        var nth = err.nth + 1
        var expectedChunk = Object.keys(expected)
            .filter(function (key) {
                return expected[key].length > 0
            })
            .map(function (key) {
                var first = expected[key][0]
                var expectedTypes = [map[key](first)].concat(expected[key].slice(1))
                return expectedTypes
                    .map(function (type) {
                        return type
                    })
                    .join(' or ')
            })
            .join(', or ')
        throw TypeError(err.fnName + ': in ' + nth + (indexs[nth] || 'th') + ' argument, ' +
            err.value + ' is not ' + expectedChunk)
    }
}

module.exports = errorHandler
