var IterumBuilder = require('./iterum-builder.js')
var Range = require('./next/range.js')
var List = require('./next/list.js')
var Empty = require('./next/empty.js')
var Value = require('./next/value.js')

var build = require('./fn/build.js')
var concat = require('./fn/concat.js')
var filter = require('./fn/filter.js')
var map = require('./fn/map.js')
var slice = require('./fn/slice.js')
var indexOf = require('./fn/indexOf.js')
var some = require('./fn/some.js')
var every = require('./fn/every.js')
var toArray = require('./fn/toArray.js')

module.exports = IterumBuilder({
    generators: {
        Range: Range,
        List: List,
        Value: Value,
        Empty: Empty
    },
    methods: {
        build: build,
        concat: concat,
        every: every,
        filter: filter,
        indexOf: indexOf,
        map: map,
        slice: slice,
        some: some,
        toArray: toArray
    }
})
