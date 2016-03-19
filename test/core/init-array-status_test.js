var expect = require('chai').expect
var initArray = require('../../src/core/init-array-status')

describe('initArray', function () {
    it('Each element of generators is in property ctor of element of arrays', function () {
        var generators = ['a', 'b', 'c', 'd']
        var args = 'bar'
        var array = initArray(generators, args)
        expect(array.map(function (e) {
            return e.ctor
        })).to.be.deep.equal(generators)
    })

    it('array has elements with property args with empty array except first element that has parameter `args`', function () {
        var generators = ['a', 'b', 'c', 'd']
        var args = ['bar', 'uuu']
        var array = initArray(generators, args)
        expect(array.map(function (e) {
            return e.args
        })).to.be.deep.equal([args, [], [], []])
    })
})
