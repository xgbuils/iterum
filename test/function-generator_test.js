var expect = require('chai').expect
var traverse = require('./utils/traverse')
var FunctionGenerator = require('../src/function-generator')

describe('FunctionGenerator', function () {
    describe('first 8 fibonacci numbers generator', function () {
        var iterator
        var values
        beforeEach(function () {
            iterator = FunctionGenerator({
                init: function () {
                    this.count = 0
                    this.secondToLast = 0
                    return 1
                },
                next: function (last) {
                    var nextValue = this.secondToLast + last
                    this.secondToLast = last
                    ++this.count
                    return nextValue
                },
                stop: function () {
                    return this.count >= 8
                }
            })
            values = []
        })
        it('starts with 1 value', function () {
            expect(iterator.next()).to.be.deep.equal({
                value: 1,
                done: false
            })
        })
        it('always generates constant value', function () {
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal([1, 1, 2, 3, 5, 8, 13, 21])
        })
        it('ends with {value: undefined, done: true}', function () {
            var end = traverse(iterator)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
    })

    describe('constant generator', function () {
        var iterator
        var values
        beforeEach(function () {
            iterator = FunctionGenerator({
                init: function () {
                    return 5
                },
                next: function () {
                    return 5
                },
                stop: function () {
                    return false
                }
            })
            values = []
        })
        it('starts with 5 value', function () {
            expect(iterator.next()).to.be.deep.equal({
                value: 5,
                done: false
            })
        })
        it('always generates constant value', function () {
            traverse(iterator, function (node) {
                values.push(node.value)
            }, 7)
            expect(values).to.be.deep.equal([5, 5, 5, 5, 5, 5, 5])
        })
        it('never ends', function () {
            traverse(iterator, 15)
            expect(iterator.next().done).to.be.not.equal(true)
        })
    })

    describe('empty generator', function () {
        var iterator
        var nodes
        beforeEach(function () {
            iterator = FunctionGenerator({
                init: function () {
                    return 'value never returned'
                },
                next: function () {
                    return 'value never returned'
                },
                stop: function () {
                    return true
                }
            })
            nodes = []
        })
        it('starts with 5 value', function () {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })
        it('always returns {value: undefined, done: true}', function () {
            traverse(iterator, function (node) {
                nodes.push(node)
            }, 3)
            expect(nodes).to.be.deep.equal([{
                value: undefined,
                done: true
            }, {
                value: undefined,
                done: true
            }, {
                value: undefined,
                done: true
            }])
        })
    })
})
