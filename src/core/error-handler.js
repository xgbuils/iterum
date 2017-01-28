var map = {
    type: type => type.toLowerCase(),
    instance: type => `${type} instance`
}

function errorHandler (err) {
    if (err) {
        var expected = err.expected
        var expectedChunk = Object.keys(expected)
            .filter(key => expected[key].length > 0)
            .map(function (key) {
                var firstType = expected[key][0]
                var article = /^[aeiou]/i.test(firstType) ? 'an' : 'a'
                var expectedTypes = [`${article} ${firstType}`]
                    .concat(expected[key].slice(1))
                return expectedTypes
                    .map(type => map[key](type))
                    .join(' or ')
            })
            .join(', or ')
        throw TypeError(`${err.value} is not ${expectedChunk}`)
    }
}

module.exports = errorHandler
