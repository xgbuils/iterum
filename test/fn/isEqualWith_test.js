const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.isEqualWith', function () {
    it('returns true if every value of iterables is equal after applying the callback', function () {
        const a = [{
            foo: 'bar'
        }, {
            foo: 'fizz',
            x: 3
        }, {
            foo: 'buzz'
        }]
        const b = [{
            foo: 'bar',
            x: 2
        }, {
            foo: 'fizz'
        }, {
            foo: 'buzz'
        }]
        expect(Iterum(a).isEqualWith(b, (a, b) => a.foo === b.foo)).to.be.equal(true)
    })

    it('returns false if some value of iterables is not equal after applying the callback', function () {
        const a = [{
            foo: 'bar'
        }, {
            foo: 'fizz',
            x: 3
        }, {
            foo: 'buzz'
        }]
        const b = [{
            foo: 'bar'
        }, {
            foo: 'buzz',
            x: 3
        }, {
            foo: 'fizz'
        }]
        expect(Iterum(a).isEqualWith(b, (a, b) => a.foo === b.foo)).to.be.equal(false)
    })

    it('returns false if iterables has different number of values', function () {
        const a = [{
            foo: 'bar'
        }, {
            foo: 'fizz',
            x: 3
        }, {
            foo: 'buzz'
        }]
        const b = [{
            foo: 'bar'
        }, {
            foo: 'fizz',
            x: 3
        }]
        expect(Iterum(a).isEqualWith(b, (a, b) => a.foo === b.foo)).to.be.equal(false)
        expect(Iterum(a).isEqualWith(b, parseInt)).to.be.equal(false)
    })

    describe('inmutability', function () {
        it('isEqualWith method does not mutate iterable object', function () {
            const a = [1, 6, 3]
            const b = [7, 8, 5]
            const x = Iterum(a)
            x.isEqualWith(b, (a, b) => a % 2 === b % 2)
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const a = [() => 1, 2, '3']
            const b = [e => e, Infinity, {}]
            const result = Iterum.isEqualWith(a, b, (a, b) => typeof a === typeof b)
            expect(result).to.be.equal(false)
        })
    })
})
