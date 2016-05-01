var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Empty = Iterum.Empty

describe('Iterum.Empty', function () {
    it('next always returns {value: undefined, done: true}', function () {
        var iterator = Iterum(Empty()).build()()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        }
    })
})
