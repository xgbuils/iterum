var expect = require('chai').expect
var traverse = require('./utils/traverse')
var RangeGenerator = require('../src/range-generator')

describe('RangeGenerator', function () {
    describe('increasing range generator (-2, 8, 2)', function () {
        var iterator
        var values
        beforeEach(function () {
            iterator = RangeGenerator(-2, 8, 2)
            values = []
        })
        it('starts with {value: -2, done: false}', function () {
            expect(iterator.next()).to.be.deep.equal({
                value: -2,
                done: false
            })
        })
        it('generates values [-2, 0, 2, 4, 6, 8]', function () {
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([-2, 0, 2, 4, 6, 8])
        })
        it('ends with {value: undefined, done: true}', function () {
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('after ending value, it always returns {value: undefined, done: true}', function () {
            var end = traverse(iterator)
            traverse(iterator, 2)
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('decreasing range generator (3, 1, -1)', function () {
        var iterator
        var values
        beforeEach(function () {
            iterator = RangeGenerator(3, 1, -1)
            values = []
        })
        it('starts with {value: 3, done: false}', function () {
            expect(iterator.next()).to.be.deep.equal({
                value: 3,
                done: false
            })
        })
        it('generates values [3, 2, 1]', function () {
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([3, 2, 1])
        })
        it('ends with {value: undefined, done: true}', function () {
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('after ending value, it always returns {value: undefined, done: true}', function () {
            var end = traverse(iterator)
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
        var iterator
        var values
        beforeEach(function () {
            values = []
        })
        it('starts with {value: 2, done: false}', function () {
            iterator = RangeGenerator(2, 2, 1)
            expect(iterator.next()).to.be.deep.equal({
                value: 2,
                done: false
            })
        })
        it('only generates one value (2)', function () {
            iterator = RangeGenerator(2, 2, 1)
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([2])
        })
        it('only generates one value (5)', function () {
            iterator = RangeGenerator(5, 5, -3)
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([5])
        })
        it('ends with {value: undefined, done: true}', function () {
            iterator = RangeGenerator(5, 5, -3)
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('range generator with zero elements', function () {
        var iterator
        var values
        beforeEach(function () {
            values = []
        })
        context('increasing generator that start value is greater than end value', function () {
            it('generates zero elements', function () {
                iterator = RangeGenerator(4, 2, 1)
                traverse(iterator, function (node) {
                    values.push(node.value)
                })
                expect(values).to.be.deep.equal([])
            })
        })
        context('decreasing generator that start value is less than end value', function () {
            it('generates zero elements', function () {
                iterator = RangeGenerator(1, 5, -2)
                traverse(iterator, function (node) {
                    values.push(node.value)
                })
                expect(values).to.be.deep.equal([])
            })
        })
    })
})
