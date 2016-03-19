function createNewIterator (context, item, previous, toArray) {
    var nextParams
    var args = []
    if (previous) {
        args.push(previous.state.value)
    }
    args.push.apply(args, item.args)
    args.push(function () {
        nextParams = toArray(arguments)
    })
    item.itor = item.ctor.apply(context, args)
    return nextParams
}

module.exports = createNewIterator
