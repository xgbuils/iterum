var expect = require('chai').expect
var traverse = require('../utils/traverse.js')
var Iterum = require('../../src/index.js')
var Cartesian = Iterum.Cartesian
var Range = Iterum.Range
var List = Iterum.List
var Empty = Iterum.Empty

describe('Iterum.Cartesian', function () {
    describe('given 2 lists, it makes cartesian product of these lists', function () {
        it('2 no empty lists', function () {
            var values = Iterum(Cartesian([1, 2], [3, 4])).toArray()
            expect(values).to.be.deep.equal([
                [1, 3],
                [1, 4],
                [2, 3],
                [2, 4]
            ])
        })

        it('first list is empty', function () {
            var values = Iterum(Cartesian([], [1, 2, 3, 4])).toArray()
            expect(values).to.be.deep.equal([])
        })

        it('second list is empty', function () {
            var values = Iterum(Cartesian([1, 2, 3, 4], [])).toArray()
            expect(values).to.be.deep.equal([])
        })

        it('2 lista are empty', function () {
            var values = Iterum(Cartesian([], [])).toArray()
            expect(values).to.be.deep.equal([])
        })

        it('first list has one element', function () {
            var values = Iterum(Cartesian([0], [1, 2, 3, 4])).toArray()
            expect(values).to.be.deep.equal([
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4]
            ])
        })
    })

    describe('one list', function () {
        it('no empty list', function () {
            var values = Iterum(Cartesian([1, 2, 3, 4])).toArray()
            expect(values).to.be.deep.equal([
                [1], [2], [3], [4]
            ])
        })

        it('empty list', function () {
            var values = Iterum(Cartesian([])).toArray()
            expect(values).to.be.deep.equal([])
        })
    })

    describe('more than 2 lists', function () {
        it('3 no empty lists with the same length', function () {
            var values = Iterum(Cartesian([1, 2], [3, 4], [5, 6])).toArray()
            expect(values).to.be.deep.equal([
                [1, 3, 5],
                [1, 3, 6],
                [1, 4, 5],
                [1, 4, 6],
                [2, 3, 5],
                [2, 3, 6],
                [2, 4, 5],
                [2, 4, 6]
            ])
        })

        it('3 no empty lists with different length', function () {
            var values = Iterum(Cartesian([1, 2], [3], [4, 5, 6])).toArray()
            expect(values).to.be.deep.equal([
                [1, 3, 4],
                [1, 3, 5],
                [1, 3, 6],
                [2, 3, 4],
                [2, 3, 5],
                [2, 3, 6]
            ])
        })

        it('there is an empty list', function () {
            var values = Iterum(Cartesian([1, 2, 3], [3, 4, 5, 3, 2, 4], [], [4, 5, 6])).toArray()
            expect(values).to.be.deep.equal([])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when it is not passed any argument', function () {
            function foo () {
                Iterum(Cartesian())
            }
            expect(foo).to.throw(TypeError,
                /^Cartesian: in 1st argument, undefined is not an Array$/)
        })

        it('throws an exception when it is passed no array in 1st argument', function () {
            function foo () {
                Iterum(Cartesian(23))
            }
            expect(foo).to.throw(TypeError,
                /^Cartesian: in 1st argument, 23 is not an Array$/)
        })

        it('second to Infinity arguments are optional but they must be Arrays', function () {
            function foo () {
                Iterum(Cartesian([23], [], [1, 3], 'foo', [1]))
            }
            expect(foo).to.throw(TypeError,
                /^Cartesian: in 4th argument, foo is not an Array$/)
        })
    })

    describe('passing iterum instance as value,', function () {
        describe('this value is converted in a sequence of values that represent the iterum instance', function () {
            it('given a iterum Cartesian', function () {
                var values = Iterum(Cartesian([Range(1, 2)], [Range(3, 4)]))
                    .toArray()
                expect(values).to.be.deep.equal([[1, 3], [1, 4], [2, 3], [2, 4]])
            })

            it('using List for concatenation', function () {
                var values = Iterum(Cartesian([Empty()], [Range(5, 1, -1)]))
                    .toArray()
                expect(values).to.be.deep.equal([])
            })
        })
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            var iterumBuilder = Iterum(List([1, 3, 6, 10]))
            var iterator = iterumBuilder.build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })
})
