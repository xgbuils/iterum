var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('Iteratum.Range', function () {
    describe('increasing range (-2, 8, 2)', function () {
        var generatorBuilder
        beforeEach(function () {
            generatorBuilder = Iterum(Range(-2, 8, 2))
        })
        it('starts with {value: -2, done: false}', function () {
            var iterator = generatorBuilder.build()()
            expect(iterator.next()).to.be.deep.equal({
                value: -2,
                done: false
            })
        })
        it('generates values [-2, 0, 2, 4, 6, 8]', function () {
            expect(generatorBuilder.toArray()).to.be.deep.equal([-2, 0, 2, 4, 6, 8])
        })
        it('ends with {value: undefined, done: true}', function () {
            var iterator = generatorBuilder.build()()
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('after ending value, it always returns {value: undefined, done: true}', function () {
            var iterator = generatorBuilder.build()()
            traverse(iterator)
            traverse(iterator, 2)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('decreasing range (3, 1, -1)', function () {
        var generatorBuilder
        beforeEach(function () {
            generatorBuilder = Iterum(Range(3, 1, -1))
        })
        it('starts with {value: 3, done: false}', function () {
            var iterator = generatorBuilder.build()()
            expect(iterator.next()).to.be.deep.equal({
                value: 3,
                done: false
            })
        })
        it('generates values [3, 2, 1]', function () {
            expect(generatorBuilder.toArray()).to.be.deep.equal([3, 2, 1])
        })
        it('ends with {value: undefined, done: true}', function () {
            var iterator = generatorBuilder.build()()
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('after ending value, it always returns {value: undefined, done: true}', function () {
            var iterator = generatorBuilder.build()()
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
            var iterator = Iterum(Range(2, 2, 1)).build()()
            expect(iterator.next()).to.be.deep.equal({
                value: 2,
                done: false
            })
        })
        it('only generates one value (2)', function () {
            expect(Iterum(Range(2, 2, 1)).toArray()).to.be.deep.equal([2])
        })
        it('only generates one value (5)', function () {
            expect(Iterum(Range(5, 5, -3)).toArray()).to.be.deep.equal([5])
        })
        it('ends with {value: undefined, done: true}', function () {
            var iterator = Iterum(Range(5, 5, -3)).build()()
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
                expect(Iterum(Range(4, 2, 1)).toArray()).to.be.deep.equal([])
            })
        })
        context('decreasing generator that start value is less than end value', function () {
            it('generates zero elements', function () {
                expect(Iterum(Range(1, 5, -2)).toArray()).to.be.deep.equal([])
            })
        })
    })
})
