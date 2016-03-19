var initArrayStatus = require('../core/init-array-status')
var createNewIterator = require('../core/create-new-iterator')

function compose () {
    var generators = toArray(arguments)
    return function () {
        return composeGeneratorCreator({
            index: 0,
            newItem: true
        }, initArrayStatus(generators, toArray(arguments)))
    }
}

function composeGeneratorCreator (state, array) {
    var last = array[array.length - 1]
    var context = {}
    return {
        next: function () {
            next(context, state, array)
            if (state.index < 0) {
                return {
                    value: undefined,
                    done: true
                }
            } else {
                return {
                    value: last.state.value,
                    done: false
                }
            }
        }
    }
}

function next (context, state, array) {
    var length = array.length
    var index = state.index
    while (index >= 0 && index < length) {
        var item = array[index]
        var nextParams
        if (state.newItem) {
            nextParams = createNewIterator(context, item, array[index - 1], toArray)
        }
        var s = item.state = item.itor.next()
        var done = s.done
        var inc = done ? -1 : 1
        index += inc
        if (inc > 0 && state.newItem && index < length) {
            array[index].args = nextParams
        }
        state.newItem = !done
    }
    state.newItem = index < length
    state.index = --index
}

function toArray (arraylike) {
    return [].slice.call(arraylike)
}

module.exports = compose
