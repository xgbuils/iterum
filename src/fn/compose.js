var initArrayStatus = require('../core/init-array-status')
var createNewIterator = require('../core/create-new-iterator')

function compose (...generators) {
    return function (...args) {
        var state = {
            index: 0,
            newItem: true
        }
        state.nextParamsCallback = function (...nextParams) {
            state.nextParams = nextParams
        }
        return composeGeneratorCreator(state, initArrayStatus(generators, args))
    }
}

function composeGeneratorCreator (state, array) {
    var last = array[array.length - 1]
    var context = {}
    return {
        next: function () {
            next(context, state, array)
            var done = state.index < 0
            return {
                value: done ? undefined : last.state.value,
                done: done
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
            nextParams = createNewIterator(context, item, array[index - 1], state)
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

module.exports = compose
