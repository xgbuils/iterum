const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.isEqualWith', function () {
    describe('method', function () {
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
            expect(Iterum(a).isEqualWith((a, b) => a.foo === b.foo, b)).to.be.equal(true)
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
            expect(Iterum(a).isEqualWith((a, b) => a.foo === b.foo, b)).to.be.equal(false)
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
            expect(Iterum(a).isEqualWith((a, b) => a.foo === b.foo, b)).to.be.equal(false)
            expect(Iterum(a).isEqualWith(parseInt, b)).to.be.equal(false)
        })

        describe('inmutability', function () {
            it('isEqualWith method does not mutate iterable object', function () {
                const a = [1, 6, 3]
                const b = [7, 8, 5]
                const x = Iterum(a)
                x.isEqualWith((a, b) => a % 2 === b % 2, b)
                expect([...x]).to.be.deep.equal([...a])
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const a = [() => 1, 2, '3']
            const b = [e => e, Infinity, {}]
            const result = Iterum.isEqualWith((a, b) => typeof a === typeof b, a, b)
            expect(result).to.be.equal(false)
        })

        it('throws an error if first parameter is not a function', function () {
            const a = [() => 1, 2, '3']
            const b = [e => e, Infinity, {}]
            function test () {
                Iterum.isEqualWith(null, a, b)
            }
            expect(test).to.throw(TypeError,
                /^null is not a function$/)
        })
    })
})
