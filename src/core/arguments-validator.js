var typeVerify = require('type-verify')

var map = {
    object: 'an [Object ${type}]',
    type: 'a ${type}',
    instance: 'an instance of `${type}`'
}

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
    return function (matches, value, types, actual) {
        if (!matches) {
            var expectedChunk = types
                .map(function (type) {
                    return typeof type === 'function' ?
                        'instance of ' + type.name : type
                })
                .join(' or ')
            var actualChunk = Object.keys(actual)
                .map(function (key) {
                    return map[key].replace(/\$\{type\}/gi, actual[key])
                })
                .join(' or ')
            throw TypeError(fnName + ': in ' + index + (indexs[index] || 'th') + ' argument ' +
                'is expected ' + expectedChunk +
                ' but value `' + value + '` is ' + actualChunk)
        }
    }
}

module.exports = argumentsValidator
