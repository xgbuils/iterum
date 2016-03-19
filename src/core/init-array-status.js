function initArray (generators, args) {
    var array = []
    var length = generators.length
    for (var i = 0; i < length; ++i) {
        var generator = generators[i]
        array.push({
            ctor: generator,
            args: []
        })
    }
    if (length > 0) {
        array[0].args = args
    }
    return array
}

module.exports = initArray
