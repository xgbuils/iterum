var findIndex = require('../core/find-index.js')

function slice (Iterum) {
    return function (start, end) {
    	var iterator = this
    	var index
    	start = start || 0
    	end = end || Infinity
        for (index = 0; index < start; ++index) {
            iterator.next()
        }
        return new Iterum(function () {
        	var result 
        	if (index < end) {
        		result = iterator.next()
        		++index
        	} 
            return result || {
            	value: undefined,
            	done: true
            }
        })
    }
}

module.exports = slice
