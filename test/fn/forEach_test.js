var expect = require('chai').expect
var sinon = require('sinon')
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('forEach', function () {
    it('traverse all values', function () {
        var cb = sinon.spy()
        var iterum = Range(5, 10, 1)
        iterum.forEach(cb)
        expect(cb.args).to.be.deep.equal([
            [5, 0, iterum],
            [6, 1, iterum],
            [7, 2, iterum],
            [8, 3, iterum],
            [9, 4, iterum],
            [10, 5, iterum]
        ])
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var cb = sinon.spy()
            var iterum = Iterum([5, 10]).repeat(2)
            iterum.forEach(cb)
            expect(cb.args).to.be.deep.equal([
                [5, 0, iterum],
                [10, 1, iterum],
                [5, 2, iterum],
                [10, 3, iterum]
            ])
        })
    })
})
