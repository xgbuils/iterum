var typeVerify = require('type-verify')

var indexs = {
    1: 'st',
    2: 'nd',
    3: 'rd'
}

function argumentsValidator (rules, args, name) {
    name = name || this.name
    rules.forEach(function (rule, index) {
        var arg = args[index]
        typeVerify(arg, rule, errorHandlerCreator(name, index + 1))
    })
}

function errorHandlerCreator (fnName, index) {
    return function (matches, value, expected, actual) {
        if (!matches) {
            var expectedChunk = Object.keys(expected)
                .filter(function (key) {
                    return expected[key].length > 0
                })
                .map(function (key) {
                    return map[key][0] + ' ' +
                        expected[key]
                        .map(function (type) {
                            return type
                        })
                        .join(' or ')
                })
                .join(', or ')
            var actualChunk = Object.keys(actual)
                .map(function (key) {
                    return map[key][0] + ' ' + actual[key]
                })
                .join(' or ')
            throw TypeError(fnName + ': in ' + index + (indexs[index] || 'th') + ' argument ' +
                'is expected ' + expectedChunk +
                ' but value `' + value + '` is ' + actualChunk)
        }
    }
}

module.exports = argumentsValidator
