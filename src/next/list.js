function List (array) {
    var index = -1
    return {
        next: function () {
            ++index
            var done = array.length <= index
            return {
                value: done ? undefined : array[index],
                done: done
            }
        }
    }
}

List.validArgs = [['Array']]

module.exports = List
