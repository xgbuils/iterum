var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('find', function () {
    it('if it exists element that predicate returns true, then it returns the pair [key, value]', function () {
        var value = Range(-5, 8, 3)
            .find(function (e) {
                return e % 4 === 0
            })
        expect(value).to.be.equal(4)
    })

    it('if it does not exist element that predicate returns true, then it returns -1', function () {
        var value = Range(-5, 8, 3)
            .find(function (e) {
                return e > 8
            })
        expect(value).to.be.equal(undefined)
    })

    describe('calling find() in iterum instance', function () {
        it('don\'t affect behaviour of iterator obtained by .build()()', function () {
            function predicate (e) {
                return e === 3
            }
            var iterum = Range(7, 1, -2)
            var iterator = iterum.build()()
            var value = iterum.find(predicate)
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values.find(predicate)).to.be.deep.equal(value)
        })
    })

    describe('using all generator parameters of callback', function () {
        it('find method does not mutate generator behaviour', function () {
            var value = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .find(function (e, index, generator) {
                    return generator
                        .slice(0, index)
                        .toArray()
                        .length > 3
                })
            expect(value).to.be.equal(2)
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var value = Iterum([100, Range(2, -Infinity, -1), 55])
                .find(function (e) {
                    return e < 0
                })
            expect(value).to.be.equal(-1)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Range(1, 6, 2).find('foo')
            }
            expect(foo).to.throw(TypeError,
                /^find: in 1st argument, foo is not a Function$/)
        })
    })
})
