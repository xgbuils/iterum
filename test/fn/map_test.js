var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Build.Range

describe('map', function () {
    describe('given RangeGenerator and 5-incremental function', function () {
        var values
        beforeEach(function () {
            values = []
        })
        it('returns values incremented 5 unities', function () {
            var iterator = new Iterum(Range(0, 2, 1)).map(function (value) {
                return value + 5
            })
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([5, 6, 7])
        })
    })
})
