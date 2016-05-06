var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

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
})
