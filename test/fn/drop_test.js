const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('drop', function () {
    describe('method', function () {
        it('drop 2 values', function () {
            const iterum = Iterum([7, 100, 4, 7, 2])
                .drop(3)
            expect([...iterum]).to.be.deep.equal([7, 2])
        })

        it('drop more values than iterable provide', function () {
            const iterum = Iterum([2, 0, 3, 6, 1, 2])
                .drop(10)
            expect([...iterum]).to.be.deep.equal([])
        })

        describe('converting iterum instance to array', function () {
            it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
                const iterum = Iterum([7, 100, 4, 7, 2])
                    .drop(2)
                const iterator = iterum[Symbol.iterator]()
                expect([...iterator]).to.be.deep.equal([...iterum])
            })
        })

        describe('inmutability', function () {
            it('drop method does not mutate object', function () {
                const a = 'dropdropdrop'
                const x = Iterum(a)
                x.drop(4)
                expect([...x]).to.be.deep.equal([...a])
            })
        })

        describe('bad arguments', function () {
            let iterable
            beforeEach(function () {
                iterable = 'bar'
            })
            it('throws an exception if does not have parameters', function () {
                function test () {
                    Iterum(iterable).drop()
                }
                expect(test).to.throw(TypeError,
                    /^undefined is not a number$/)
            })

            it('throws an exception when the first argument is not a number', function () {
                function test () {
                    Iterum(iterable).drop(true)
                }
                expect(test).to.throw(TypeError,
                    /^true is not a number$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.drop(2, [5, 7, 10])
            expect([...iterable]).to.be.deep.equal([10])
        })

        it('throws an error if first parameter is not a number', function () {
            function test () {
                Iterum.drop(true, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^true is not a number$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.drop(5, true)
            }
            expect(test).to.throw(TypeError,
                /^true is not an Iterable instance$/)
        })
    })
})
