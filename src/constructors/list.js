function List (validator, Iterum) {
    return function (array) {
        validator.validate([['Array']], arguments)
        return Iterum(function () {
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
        })
    }
}

module.exports = List
