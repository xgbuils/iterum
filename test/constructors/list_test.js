var expect = require('chai').expect
var traverse = require('../utils/traverse.js')
var Iterum = require('../../src/index.js')
var List = Iterum.List
var Range = Iterum.Range
var Value = Iterum.Value

describe('Iterum.List', function () {
    describe('given an array passed to List constructor, then this values are provided by iterum instance', function () {
        it('empty list', function () {
            var iterator = Iterum(List([])).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('list with one element', function () {
            var obj = {foo: 'bar', 1: []}
            var iterator = Iterum(List([obj])).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: obj,
                done: false
            })
        })
        it('list with several elements', function () {
            var ARRAY = [1, 7, 4, 9, 5, 2, 7, 4]
            var values = Iterum(List(ARRAY))
                .toArray()

            expect(values).to.be.deep.equal(ARRAY)
        })
    })

    describe('passing iterum instance as value,', function () {
        describe('this value is converted in a sequence of values that represent the iterum instance', function () {
            it('given a iterum List', function () {
                var values = Iterum(List([100, Range(1, 5), 100]))
                    .toArray()
                expect(values).to.be.deep.equal([100, 1, 2, 3, 4, 5, 100])
            })

            it('using List for concatenation', function () {
                var values = Iterum(List([
                    List([1, 5, 3, 4]),
                    Value(200),
                    Range(5, 1, -1)
                ]))
                .toArray()
                expect(values).to.be.deep.equal([1, 5, 3, 4, 200, 5, 4, 3, 2, 1])
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

    describe('bad arguments', function () {
        it('throws an exception when the first arguments is not a Array', function () {
            function foo () {
                Iterum(List('bar'))
            }
            expect(foo).to.throw(TypeError,
                /List: in 1st argument, bar is not an Array/)
        })
    })
})
