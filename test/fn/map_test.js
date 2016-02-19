var expect = require('chai').expect
var traverse = require('../utils/traverse')
var RangeGenerator = require('../../src/range-generator')
var map = require('../../src/fn/map')

describe('map', function () {
    describe('given RangeGenerator and 5-incremental function', function () {
        var iterator
        var values
        beforeEach(function () {
            iterator = RangeGenerator(-2, 8, 2)
            values = []
        })
        it('returns values incremented 5 unities', function () {
            var funGen = map(RangeGenerator, function (value) {
            	return value + 5
            })

            traverse(funGen(0, 2, 1), function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([5, 6, 7])
        })
    })
})
