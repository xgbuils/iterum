var expect = require('chai').expect
var traverse = require('../utils/traverse.js')
var Iterum = require('../../src/index.js')
var List = Iterum.List
var Range = Iterum.Range
var Value = Iterum.Value
var Repeat = Iterum.Repeat

describe('Iterum.List', function () {
    describe('given an array passed to List constructor, then this values are provided by iterum instance', function () {
        it('empty list', function () {
            var iterator = List([]).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('list with one element', function () {
            var obj = {foo: 'bar', 1: []}
            var iterator = List([obj]).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: obj,
                done: false
            })
        })
        it('list with several elements', function () {
            var ARRAY = [1, 7, 4, 9, 5, 2, 7, 4]
            var values = List(ARRAY)
                .toArray()

            expect(values).to.be.deep.equal(ARRAY)
        })
    })

    describe('If value is a iterum instance,', function () {
        describe('this value is interpreted as a sequence of values of this iterum instance', function () {
            it('using Range and Repeat as iterum instance values inside List array parameter', function () {
                var values = List([100, Range(1, 5), Repeat(1, 2)]).toArray()
                expect(values).to.be.deep.equal([100, 1, 2, 3, 4, 5, 1, 1])
            })

            it('using List instance as a parameter of Value instance', function () {
                var values = Value(List([1, 5, 3, 4])).toArray()
                expect(values).to.be.deep.equal([1, 5, 3, 4])
            })
        })
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect behaviour of iterator obtained by .build()()', function () {
            var iterumBuilder = List([1, 3, 6, 10])
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
                List('bar')
            }
            expect(foo).to.throw(TypeError,
                /^List: in 1st argument, bar is not an Array$/)
        })
    })

    describe('If List instance is passed as param of Iterum', function () {
        it('creates a clone of Cartesian instance', function () {
            var PARAMS = [1, 5]
            var a = List(PARAMS)
            var b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect(a.toArray()).to.be.deep.equal(b.toArray())
        })
    })
})
