var expect = require('chai').expect
var EmptyGenerator = require('../src/empty-generator')

describe('EmptyGenerator', function () {
    it('next always returns {value: undefined, done: true}', function () {
        var iterator = EmptyGenerator()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        }
    })
})
