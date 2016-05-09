var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('.map', function () {
    it('method returns and Iterum instance', function () {
        var values = Iterum(Range(1, 3, 1))
            .map(function (value) {
                return value * 2
            })
            .toArray()
        expect(values).to.be.deep.equal([2, 4, 6])
    })

    describe('calling toArray() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            var iterumBuilder = Iterum(Range(8, 3, -1)).map(function (e) {
                return 2 * e
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
        it('map method does not mutate object', function () {
            var x = Iterum(Range(8, 3, -1))
            x.map(function (e) {
                return e + 2
            })
            expect(x.toArray()).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })
})
