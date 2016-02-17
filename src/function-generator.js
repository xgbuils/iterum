function FunctionGenerator (options) {
	var context = {}
	var value = options.init.call(context)
	return {
		next: function () {
			var done = options.stop.call(context, value)
			var result = {
                value: done ? undefined : value,
                done: done
			}
			value = options.next.call(context, value)
			return result
		}
	}
}

module.exports = FunctionGenerator