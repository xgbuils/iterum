var expect = require('chai').expect
var Iteratum = require('../../src/index.js')
var Empty = Iteratum.Build.Empty

describe('Iterum.Empty', function () {
    it('next always returns {value: undefined, done: true}', function () {
        var iterator = new Iteratum(Empty())
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        }
    })
})
