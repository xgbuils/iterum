var argumentsVerify = require('arguments-verify')
var errorHandler = require('./core/error-handler.js')

function IterumBuilder (options) {
    var constructors = options.constructors
    function Iterum (iterable) {
        if (!(this instanceof Iterum)) {
            return new Iterum(iterable)
        }
        const entries = iterable.entries
        //argumentsVerify([['Function', Iterum]], arguments, errorHandler, 'Iterum')
        if (iterable instanceof Iterum) {
            this[Symbol.iterator] = iterable[Symbol.iterator]
        } else if (typeof iterable === 'function') {
            this[Symbol.iterator] = transformGenerator(iterable, this)
        } else {
            this[Symbol.iterator] = transformGenerator(iterable[Symbol.iterator], iterable)
        }
        this.entries = typeof entries === 'function'
            ? entries.bind(iterable)
            : defaultEntries
    }

    function* defaultEntries () {
        let index = 0
        for (let val of this) {
            yield [index, val]
            ++index
        }
    }

    Object.keys(constructors).forEach(function (constructorName) {
        Iterum[constructorName] = constructors[constructorName]({
            fnName: constructorName,
            validate: argumentsVerify,
            handler: errorHandler
        }, Iterum)
    })

    var methods = options.methods
    Object.keys(methods).forEach(function (methodName) {
        Iterum.prototype[methodName] = methods[methodName]({
            fnName: methodName,
            validate: argumentsVerify,
            handler: errorHandler
        }, Iterum)
    })

    function transformGenerator (generator, iterum) {
        var rawGenerator = generator.bind(iterum)
        return function* () {
            let iterator = rawGenerator()
            let stack = []

            while (true) {
                let done
                let value
                let pop
                let push
                do {
                    const state = iterator.next()
                    value = state.value
                    done = state.done
                    pop = done && stack.length > 0
                    push = !done && value instanceof Iterum
                    if (pop) {
                        iterator = stack.pop()
                    } else if (push) {
                        stack.push(iterator)
                        iterator = value[Symbol.iterator]()
                    }
                } while (pop || push)
                if (done) {
                    return
                }
                yield value
            }
        }
    }

    return Iterum
}

module.exports = IterumBuilder
