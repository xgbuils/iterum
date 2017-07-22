const log = require('./log')
const Benchmarck = require('benchmark')

module.exports = function (options) {
    return function (indentation = 0) {
        return log(indentation, `${options.name}\n`, '- ')
            .then(() => suiteFactory(options, indentation))
    }
}

function suiteFactory (options, indentation) {
    return new Promise(resolve => {
        const context = {}
        options.setups.forEach(function (setup) {
            setup.call(context)
        })
        options.tests.reduce((suite, test) => {
            return suite.add(test.name, () => test.fn.call(context))
        }, new Benchmarck.Suite())
            .on('cycle', x => log(indentation + 4, `${String(x.target)}\n`, '- '))
            .on('complete', function () {
                log(indentation + 4, `Fastest is ${this.filter('fastest').map('name')}\n`)
                resolve()
            })
            .run({async: true})
    })
}
