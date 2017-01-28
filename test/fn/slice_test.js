var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('slice', function () {
    describe('given slice with `start` and `end` parameters inside of range', function () {
        it('generator that returns an iterator slice', function () {
            var values = Range(0, 3, 1)
                .slice(1, 3)
                .toArray()
            expect(values).to.be.deep.equal([1, 2])
        })
    })

    describe('given slice with `start` and `end` parameters outside of range', function () {
        it('generator that returns an iterator slice', function () {
            var values = Range(0, 3, 1)
                .slice(-1, 100)
                .toArray()
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `start` and `end` parameters outside of range', function () {
        it('generator that returns an iterator the same iterator', function () {
            var values = Range(0, 3, 1)
                .slice()
                .toArray()
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `end` parameter', function () {
        it('generator that returns an iterator that is cut only by `start` parameter', function () {
            var values = Range(0, 3, 1)
                .slice(2)
                .toArray()
            expect(values).to.be.deep.equal([2, 3])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var values = new Iterum([Range(5, 2, -1), 8]).slice(1, 2).toArray()
            expect(values).to.be.deep.equal([4])
        })
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect behaviour of iterator obtained by .build()()', function () {
            var iterumBuilder = Range(8, 3, -1).slice(2, 4)
            var iterator = iterumBuilder.build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })

    describe('inmutability', function () {
        it('slice method does not mutate object', function () {
            var x = Range(8, 3, -1)
            x.slice(1, 4)
            expect(x.toArray()).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a Number or undefined', function () {
            function foo () {
                Range(5, 10, 1)
                .slice(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not a number or undefined$/)
        })

        it('throws an exception when the second argument is not a Number or undefined', function () {
            function foo () {
                Range(5, 10, 1)
                .slice(2, /^\d+/)
            }
            expect(foo).to.throw(TypeError,
                '/^\\d+/ is not a number or undefined')
        })
    })
})
