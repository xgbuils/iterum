var ends = require('./core/ends')

function EmptyGenerator () {
    return {
        next: ends
    }
}

module.exports = EmptyGenerator
