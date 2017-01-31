const {expect} = require('chai')
const initArray = require('../../src/core/init-array-status')

describe('initArray', function () {
    it('Each element of generators is in property ctor of element of arrays', function () {
        const generators = ['a', 'b', 'c', 'd']
        const args = 'bar'
        const array = initArray(generators, args)
        expect(array.map(function (e) {
            return e.ctor
        })).to.be.deep.equal(generators)
    })

    it('array has elements with property args with empty array except first element that has parameter `args`', function () {
        const generators = ['a', 'b', 'c', 'd']
        const args = ['bar', 'uuu']
        const array = initArray(generators, args)
        expect(array.map(function (e) {
            return e.args
        })).to.be.deep.equal([args, [], [], []])
    })
})
