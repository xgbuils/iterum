function List (array) {
    var index = -1
    return function () {
        ++index
        var done = array.length <= index
        return {
            value: done ? undefined : array[index],
            done: done
        }
    }
}

module.exports = List
