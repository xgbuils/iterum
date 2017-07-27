function argumentsVerify (rules, args) {
    const {length} = args
    let err
    rules.some(function ({predicate, type}, index) {
        const arg = args[index]
        if (!predicate(arg)) {
            err = `${arg} is not ${type}`
        }
        return err
    })
    if (err || rules.length > length) {
        throw TypeError(err || `argument ${length + 1} is required`)
    }
}

module.exports = argumentsVerify
