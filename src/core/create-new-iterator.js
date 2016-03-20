function createNewIterator (context, item, previous, state) {
    state.nextParams = undefined
    var args = createArgs(item.args || [], state.nextParamsCallback, previous && previous.state.value)
    item.itor = item.ctor.apply(context, args)
    return state.nextParams
}

function createArgs (args, _, value) {
    var params = []
    for (var i = 0; i < args.length; ++i) {
        params.push(args[i] === _ ? value : args[i])
    }
    params.push(_)
    return params
}

module.exports = createNewIterator
