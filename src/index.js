var IterumBuilder = require('./iterum-builder.js')
var Range = require('./next/range.js')
var List = require('./next/list.js')
var Empty = require('./next/empty.js')
var Value = require('./next/value.js')
var map = require('./fn/map.js')
var concat = require('./fn/concat.js')
var filter = require('./fn/filter.js')
var slice = require('./fn/slice.js')
var indexOf = require('./fn/indexOf.js')
var toArray = require('./fn/toArray.js')

module.exports = IterumBuilder({
    constructors: {
        Range: Range,
        List: List,
        Value: Value,
        Empty: Empty
    },
    methods: {
        map: map,
        concat: concat,
        filter: filter,
        slice: slice,
        indexOf: indexOf,
        toArray: toArray
    }
})
