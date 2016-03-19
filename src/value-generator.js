function ValueGenerator (value) {
    var done = false
    return {
        next: function () {
            var result = {
                value: done ? undefined : value,
                done: done
            }
            done = true
            return result
        }
    }
}

module.exports = ValueGenerator
