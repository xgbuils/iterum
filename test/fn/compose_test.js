var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range
var Value = Iterum.Value
var Empty = Iterum.Empty
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
                    return Iterum(Range(0, n)).build()()
                },
                function (i, _) {
                    _(i, _)
                    return Iterum(Range(0, i)).build()()
                },
                function (i, j, _) {
                    _(i, j, _)
                    return Iterum(Range(0, j)).build()()
                },
                function (i, j, k) {
                    return Iterum(Value([k, j, i])).build()()
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
                    return Iterum(Range(1, 6)).build()()
                },
                function (i) {
                    if (i % 2 === 1) {
                        return Iterum(Range(0, 6, 2)).build()()
                    } else {
                        return Iterum(Value(100)).build()()
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

    describe('test using empty generators', function () {
        it('does not return values when parent generator is empty', function () {
            var generator = compose(
                function (_) {
                    _(_)
                    return Iterum(Range(1, 3)).build()()
                },
                function (i) {
                    var genBuilder = i % 2 === 1 ? Iterum(Value(1)) : Iterum(Empty())
                    return genBuilder.build()()
                },
                function () {
                    return Iterum(Range(1, 3)).build()()
                }
            )
            var iterator = generator()
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([
                1, 2, 3, 1, 2, 3
            ])
        })
    })
})
