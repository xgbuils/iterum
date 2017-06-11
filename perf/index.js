const sliceSuites = require('./slice/')
const traverseSuites = require('./traverse/')
const log = require('./log')

const suitesCollection = [{
    name: 'slice',
    suites: sliceSuites
}, {
    name: 'traverse',
    suites: traverseSuites
}]

suitesCollection.reduce((prom, suites) => {
    return prom
        .then(() => log(0, `${suites.name}\n`, '- '))
        .then(() => {
            return suites.suites.reduce((prom, suite) => {
                return prom
                    .then(() => log(4, `${suite.name}\n`, '- '))
                    .then(suite.suite)
            }, Promise.resolve())
        })
}, Promise.resolve())
