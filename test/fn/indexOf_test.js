var expect = require('chai').expect
var traverse = require('../utils/traverse')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('indexOf', function () {
    it('in range iterator between 5 and 10, 7 is in 2 position', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(7)).to.be.deep.equal(2)
    })

    it('in range iterator between 5 and 10, 5 is in 0 position', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(7)).to.be.deep.equal(2)
    })

    it('in range iterator between 5 and 10, 10 is in 5 position', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(7)).to.be.deep.equal(2)
    })

    it('in range iterator between 5 and 10, with 0 it returns -1', function () {
        var iterator = new Iterum(Range(5, 10, 1))
        expect(iterator.indexOf(0)).to.be.deep.equal(-1)
    })

    describe('calling indexOf() in iterum instance', function () {
        it('don\'t affect using iterator obtained by .build()()', function () {
            var elem = 8
            var iterumBuilder = Iterum(Range(5, 10, 1))
            var iterator = iterumBuilder.build()()
            var index = iterumBuilder.indexOf(elem)
            var values = []
            traverse(iterator, function (node) {
                values.push(node.value)
            })
            expect(values.indexOf(elem)).to.be.deep.equal(index)
        })
    })
})
