var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range
var Value = Iterum.Value

describe('filter', function () {
    it('omit odd numbers', function () {
        var values = Range(0, 10)
            .filter(function (e) {
                return e % 2 === 0
            })
            .toArray()
        expect(values).to.be.deep.equal([0, 2, 4, 6, 8, 10])
    })

    it('returns empty list, so any value of iterator is 3.14', function () {
        var values = new Range(0, 10, 1)
            .filter(function (value) {
                return value === 3.14
            })
            .toArray()
        expect(values).to.be.deep.equal([])
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            var iterumBuilder = Range(8, 3, -1).filter(function (e) {
                return e % 2 === 1
            })
            var iterator = iterumBuilder
                .build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })

    describe('inmutability', function () {
        it('filter method does not mutate object', function () {
            var x = Range(8, 3, -1)
            x.filter(function (e) {
                return e % 2 === 1
            })
            expect(x.toArray()).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('using the whole parameters of callback', function () {
        it('filter method does not mutate generator behaviour', function () {
            var values = Range(1, 10)
                .filter(function (e, index, generator) {
                    return e <= 8 &&
                        index % 2 === 0 &&
                        generator.slice(index).toArray().length <= 8
                })
                .toArray()
            expect(values).to.be.deep.equal([3, 5, 7])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var values = Value(Range(1, 5))
                .filter(function (e) {
                    return e <= 3
                })
                .toArray()
            expect(values).to.be.deep.equal([1, 2, 3])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Range(5, 10, 1).filter(null)
            }
            expect(foo).to.throw(TypeError,
                /^filter: in 1st argument, null is not a Function$/)
        })
    })
})
