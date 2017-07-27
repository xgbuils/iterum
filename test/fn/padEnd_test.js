const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('padEnd', function () {
    describe('method', function () {
        it('padEnd with length 0 returns iterable that iterate over the same values', function () {
            const iterable = ['a', 'b', 'c']
            const value = 'foo'
            const paddedIterable = Iterum(iterable).padEnd(0, value)
            expect([...paddedIterable]).to.be.deep.equal([...iterable])
        })

        it('padEnd with length greater than number of iterable values, it pads the last values until length', function () {
            const iterable = 'abc'
            const value = 'foo'
            const expectedIterable = ['a', 'b', 'c', value, value]
            const paddedIterable = Iterum(iterable).padEnd(5, value)
            expect([...paddedIterable]).to.be.deep.equal([...expectedIterable])
        })

        it('padEnd with the same length as number of iterable values, it does not pads anything', function () {
            const iterable = 'abc'
            const value = 'foo'
            const expectedIterable = ['a', 'b', 'c']
            const paddedIterable = Iterum(iterable).padEnd(3, value)
            expect([...paddedIterable]).to.be.deep.equal([...expectedIterable])
        })

        it('padEnd with length lower than number of iterable values, it does not pads anything', function () {
            const iterable = 'abc'
            const value = 'foo'
            const expectedIterable = ['a', 'b', 'c']
            const paddedIterable = Iterum(iterable).padEnd(1, value)
            expect([...paddedIterable]).to.be.deep.equal([...expectedIterable])
        })

        describe('inmutability', function () {
            it('padEnd method does not mutate object', function () {
                const array = [3, 6, 2, 4, 8, 1]
                const expected = array.map(e => e)
                const iterable = Iterum(array)
                iterable.padEnd(100, Infinity)
                expect([...iterable]).to.be.deep.equal(expected)
            })
        })

        describe('bad arguments', function () {
            let iterable
            beforeEach(function () {
                iterable = [1, 4, 2, 3]
            })
            it('throws an exception if are not passed parameters', function () {
                function test () {
                    Iterum(iterable).padEnd()
                }
                expect(test).to.throw(TypeError,
                    /^undefined is not a number$/)
            })

            it('throws an exception when the first argument is not a number or undefined', function () {
                function test () {
                    Iterum(iterable).padEnd(true)
                }
                expect(test).to.throw(TypeError,
                    /^true is not a number$/)
            })

            it('throws an exception if is passed just one parameter', function () {
                function test () {
                    Iterum(iterable).padEnd(3)
                }
                expect(test).to.throw(TypeError,
                    /^argument 2 is required$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const padEndIterable = Iterum.padEnd(5, 'foo', [5, 7, 10])
            expect([...padEndIterable]).to.be.deep.equal([5, 7, 10, 'foo', 'foo'])
        })

        it('throws an error if first parameter is not a number', function () {
            function test () {
                Iterum.padEnd(null, 'foo', [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^null is not a number$/)
        })

        it('throws an error if third parameter is not an iterable', function () {
            function test () {
                Iterum.padEnd(5, 'foo', 8)
            }
            expect(test).to.throw(TypeError,
                /^8 is not an iterable$/)
        })
    })
})
