var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range
var List = Iterum.List

describe('every', function () {
    it('if predicate is true for every value, returns true', function () {
        var value = Iterum(Range(5, 10, 1))
            .every(function (e) {
                return e >= 5 && e <= 10
            })
        expect(value).to.be.equal(true)
    })

    it('if predicate returns false for some value, returns false', function () {
        var value = Iterum(Range(5, 10, 1))
            .every(function (e) {
                return e < 10
            })
        expect(value).to.be.equal(false)
    })

    describe('calling every() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            function predicate (e) {
                return e < 10
            }
            var iterumBuilder = Iterum(Range(5, 10, 1))
            var iterator = iterumBuilder.build()()
            var every = iterumBuilder.every(predicate)
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values.every(predicate)).to.be.deep.equal(every)
        })
    })

    describe('using generator parameters of callback', function () {
        it('every method does not mutate generator behaviour', function () {
            var value = Iterum(List([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6]))
                .every(function (e, index, generator) {
                    return generator
                        .slice(0, index)
                        .toArray()
                        .reduce(function (a, b) {
                            return a + b
                        }, 0) > 5
                })
            expect(value).to.be.deep.equal(false)
        })
    })
})
