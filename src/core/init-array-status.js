function initArray (generators, args) {
    var array = generators.map(function (generator) {
        return {
            ctor: generator,
            args: []
        }
    })
    if (generators.length > 0) {
        array[0].args = args
    }
    return array
}

module.exports = initArray
