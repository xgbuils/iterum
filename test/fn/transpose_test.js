const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('transpose', function () {
    describe('method', function () {
        it('transpose iterables with the same number of values', function () {
            const iterable = Iterum([
                [1, 2, 3],
                'abc',
                new Set([true, false, null])
            ]).transpose()
            expect([...iterable]).to.be.deep.equal([
                [1, 'a', true],
                [2, 'b', false],
                [3, 'c', null]
            ])
        })

        it('transpose iterables with distinct number of values', function () {
            const iterable = Iterum([
                [1, 2],
                'a',
                new Set([true, false, null])
            ]).transpose()
            expect([...iterable]).to.be.deep.equal([
                [1, 'a', true]
            ])
        })

        it('transpose just one iterable', function () {
            const iterable = Iterum([
                [1, 2, 3]
            ]).transpose()
            expect([...iterable]).to.be.deep.equal([[1], [2], [3]])
        })

        it('transpose zero iterables', function () {
            const iterable = Iterum([]).transpose()
            expect([...iterable]).to.be.deep.equal([])
        })

        describe('bad arguments', function () {
            it('throws an exception when the first argument is not a function', function () {
                function foo () {
                    Iterum({}).transpose()
                }
                expect(foo).to.throw(TypeError,
                    /^\[object Object\] is not an Iterable instance$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.transpose([[5, 7, 10], [4, 6, 9]])
            expect([...iterable]).to.be.deep.equal([[5, 4], [7, 6], [10, 9]])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.transpose(6)
            }
            expect(test).to.throw(TypeError,
                /^6 is not an Iterable instance$/)
        })
    })
})
