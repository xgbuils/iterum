var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('Iterum.Range', function () {
    describe('increasing range (-2, 8, 2)', function () {
        var rangeIterable
        beforeEach(function () {
            rangeIterable = Range(-2, 8, 2)
        })
        it('starts with {value: -2, done: false}', function () {
            var iterator = rangeIterable[Symbol.iterator]()
            expect(iterator.next()).to.be.deep.equal({
                value: -2,
                done: false
            })
        })
        it('generates values [-2, 0, 2, 4, 6, 8]', function () {
            expect([...rangeIterable]).to.be.deep.equal([-2, 0, 2, 4, 6, 8])
        })
        it('ends with {value: undefined, done: true}', function () {
            var iterator = rangeIterable[Symbol.iterator]()
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('after ending value, it always returns {value: undefined, done: true}', function () {
            var iterator = rangeIterable[Symbol.iterator]()
            traverse(iterator)
            traverse(iterator, 2)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('decreasing range (3, 1, -1)', function () {
        var rangeIterable
        beforeEach(function () {
            rangeIterable = Range(3, 1, -1)
        })
        it('starts with {value: 3, done: false}', function () {
            var iterator = rangeIterable[Symbol.iterator]()
            expect(iterator.next()).to.be.deep.equal({
                value: 3,
                done: false
            })
        })
        it('generates values [3, 2, 1]', function () {
            expect([...rangeIterable]).to.be.deep.equal([3, 2, 1])
        })
        it('ends with {value: undefined, done: true}', function () {
            var iterator = rangeIterable[Symbol.iterator]()
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('after ending value, it always returns {value: undefined, done: true}', function () {
            var iterator = rangeIterable[Symbol.iterator]()
            traverse(iterator)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('range generator with one element', function () {
        it('starts with {value: 2, done: false}', function () {
            var iterator = Range(2, 2, 1)[Symbol.iterator]()
            expect(iterator.next()).to.be.deep.equal({
                value: 2,
                done: false
            })
        })
        it('only generates one value (2)', function () {
            expect([...Range(2, 2, 1)]).to.be.deep.equal([2])
        })
        it('only generates one value (5)', function () {
            expect([...Range(5, 5, -3)]).to.be.deep.equal([5])
        })
        it('ends with {value: undefined, done: true}', function () {
            var iterator = Range(5, 5, -3)[Symbol.iterator]()
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('range generator with zero elements', function () {
        context('increasing generator that start value is greater than end value', function () {
            it('generates zero elements', function () {
                expect([...Range(4, 2, 1)]).to.be.deep.equal([])
            })
        })
        context('decreasing generator that start value is less than end value', function () {
            it('generates zero elements', function () {
                expect([...Range(1, 5, -2)]).to.be.deep.equal([])
            })
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            var rangeIterable = Range(8, 3, -1)
            var iterator = rangeIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...rangeIterable])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when is passed one parameter', function () {
            function foo () {
                Range(3)
            }
            expect(foo).to.throw(TypeError,
                /undefined is not a number/)
        })

        it('throws an exception when is not passed any parameter', function () {
            function foo () {
                Range()
            }
            expect(foo).to.throw(TypeError,
                /undefined is not a number/)
        })
    })

    describe('If Range instance is passed as param of Iterum', function () {
        it('creates a clone of Range instance', function () {
            var a = Range(6, 3, -2)
            var b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect([...a]).to.be.deep.equal([...b])
        })
    })
})
