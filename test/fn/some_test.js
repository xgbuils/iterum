var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range
var List = Iterum.List

describe('some', function () {
    it('if predicate is true for some value, returns true', function () {
        var value = Iterum(Range(5, 10, 1))
            .some(function (e) {
                return e % 2 === 0
            })
        expect(value).to.be.equal(true)
    })

    it('if predicate return false for every value, returns false', function () {
        var value = new Iterum(Range(5, 10, 1))
            .some(function (e) {
                return e > 20
            })
        expect(value).to.be.equal(false)
    })

    describe('calling some() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            function predicate (e) {
                return e % 2 === 0
            }
            var iterumBuilder = Iterum(Range(5, 10, 1))
            var iterator = iterumBuilder.build()()
            var some = iterumBuilder.some(predicate)
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values.some(predicate)).to.be.deep.equal(some)
        })
    })

    describe('using generator parameters of callback', function () {
        it('some method does not mutate generator behaviour', function () {
            var value = Iterum(List([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6]))
                .some(function (e, index, generator) {
                    return generator
                        .slice(0, index)
                        .toArray()
                        .reduce(function (a, b) {
                            return a + b
                        }, 0) > 5
                })
            expect(value).to.be.deep.equal(true)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Iterum(Range(5, 10, 1))
                    .some('bar')
            }
            expect(foo).to.throw(TypeError,
                /^some: in 1st argument, bar is not a Function$/)
        })
    })
})
