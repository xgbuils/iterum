const log = require('./log')

module.exports = function suiteCollectionFactory (options) {
    return function (indentation = 0) {
        return log(indentation, `${options.name}\n`).then(() => {
            return options.suites.reduce((prom, suite) => {
                return prom.then(() => suite(indentation + 4))
            }, Promise.resolve())
        })
    }
}
