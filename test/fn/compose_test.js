var expect = require('chai').expect
var traverse = require('../utils/traverse')
var RangeGenerator = require('../../src/range-generator')
var ValueGenerator = require('../../src/value-generator')
var compose = require('../../src/fn/compose')

describe('compose', function () {
    var values
    beforeEach(function () {
        values = []
    })
    describe('compose range generators creating a new generator that', function () {
        it('returns array of values [i, j, k] where i <= j <= k', function () {
            var generator = compose(
                function (n, _) {
                    _(_)
                    return RangeGenerator(0, n)
                },
                function (i, _) {
                    _(i, _)
                    return RangeGenerator(0, i)
                },
                function (i, j, _) {
                    _(i, j, _)
                    return RangeGenerator(0, j)
                },
                function (i, j, k) {
                    return ValueGenerator([k, j, i])
                }
            )
            var iterator = generator(2)
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([
                [0, 0, 0],
                [0, 0, 1],
                [0, 1, 1],
                [1, 1, 1],
                [0, 0, 2],
                [0, 1, 2],
                [1, 1, 2],
                [0, 2, 2],
                [1, 2, 2],
                [2, 2, 2]
            ])
        })

        it('returns values following this sequence: (0, 2, 4, 6, 100) x 3', function () {
            var generator = compose(
                function (_) {
                    _(_)
                    return RangeGenerator(1, 6)
                },
                function (i) {
                    if (i % 2 === 1) {
                        return RangeGenerator(0, 6, 2)
                    } else {
                        return ValueGenerator(100)
                    }
                }
            )
            var iterator = generator()
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([
                0, 2, 4, 6, 100, 0, 2, 4, 6, 100, 0, 2, 4, 6, 100
            ])
        })
    })
})
