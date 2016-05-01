var expect = require('chai').expect
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
})
