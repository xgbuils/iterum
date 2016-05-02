var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Repeat = Iterum.Repeat

describe('Iterum.Repeat', function () {
    it('without second parameter, it always returns the same value', function () {
        var iterator = Iterum(Repeat(8)).build()()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: 8,
                done: false
            })
        }
    })

    it('if second parameter is 0, it always returns {value: undefined, done: true}', function () {
        var iterator = Iterum(Repeat(8, 0)).build()()
        for (var i = 0; i < 5; ++i) {
            expect(iterator.next()).to.be.deep.equal({
                value: undefined,
                done: true
            })
        }
    })

    it('if second parameter is 3, it returns the first parameter three times', function () {
        expect(Iterum(Repeat(8, 3)).toArray()).to.be.deep.equal([8, 8, 8])
    })
})
