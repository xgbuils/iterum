var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('filter', function () {
    it('omit odd numbers', function () {
        var values = Iterum(Range(0, 10))
            .filter(function (e) {
                return e % 2 === 0
            })
            .toArray()
        expect(values).to.be.deep.equal([0, 2, 4, 6, 8, 10])
    })

    it('returns empty list, so any value of iterator is 3.14', function () {
        var values = new Iterum(Range(0, 10, 1))
            .filter(function (value) {
                return value === 3.14
            })
            .toArray()
        expect(values).to.be.deep.equal([])
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            var iterumBuilder = Iterum(Range(8, 3, -1)).filter(function (e) {
                return e % 2 === 1
            })
            var iterator = iterumBuilder
                .build()()
            var array = iterumBuilder.toArray()
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values).to.be.deep.equal(array)
        })
    })

    describe('inmutability', function () {
        it('filter method does not mutate object', function () {
            var x = Iterum(Range(8, 3, -1))
            x.filter(function (e) {
                return e % 2 === 1
            })
            expect(x.toArray()).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })
})
