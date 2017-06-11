const sliceSuites = require('./slice')
const log = require('./log')

const suitesCollection = [{
    name: 'slice',
    suites: sliceSuites
}]

suitesCollection.reduce((p, suites) => {
    return p
        .then(() => log(0, `${suites.name}\n`, '- '))
        .then(() => {
            return suites.suites.reduce((prom, suite) => {
                return prom
                    .then(() => log(4, `${suite.name}\n`, '- '))
                    .then(suite.suite)
            }, Promise.resolve())
        })
}, Promise.resolve())
