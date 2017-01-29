var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('findIndex', function () {
    it('if it exists element that predicate returns true, then it returns its index', function () {
        var index = Range(5, 10, 1)
            .findIndex(function (e) {
                return e % 9 === 0
            })
        expect(index).to.be.equal(4)
    })

    it('if it does not exist element that predicate returns true, then it returns -1', function () {
        var index = Range(5, 10, 1)
            .findIndex(function (e) {
                return e % 9 === 0
            })
        expect(index).to.be.equal(4)
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            function predicate (e) {
                return e % 4 === 0
            }
            var iterum = Range(5, 10, 1)
            var iterator = iterum[Symbol.iterator]()
            var index = iterum.findIndex(predicate)
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values.findIndex(predicate)).to.be.equal(index)
        })
    })

    describe('using all generator parameters of callback', function () {
        it('findIndex method does not mutate iterum instance behaviour', function () {
            var index = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .findIndex(function (e, index, iterum) {
                    return [...iterum
                        .slice(0, index)]
                        .length > 5
                })
            expect(index).to.be.deep.equal(6)
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var index = Iterum([100, Range(2, 1, -1), 100])
                .findIndex(function (e) {
                    return e === 2
                })
            expect(index).to.be.deep.equal(1)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Range(5, 10, 1)
                .findIndex(new Number(8))
            }
            expect(foo).to.throw(TypeError,
                /^8 is not a function$/)
        })
    })
})
