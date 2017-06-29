const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('repeat', function () {
    describe('method', function () {
        it('if parameter is 0, it always returns {value: undefined, done: true}', function () {
            const iterator = Iterum([8]).repeat(0)[Symbol.iterator]()
            for (let i = 0; i < 5; ++i) {
                expect(iterator.next()).to.be.deep.equal({
                    value: undefined,
                    done: true
                })
            }
        })

        it('if parameter is negative, it always returns {value: undefined, done: true}', function () {
            const iterator = Iterum([8]).repeat(-5)[Symbol.iterator]()
            for (let i = 0; i < 5; ++i) {
                expect(iterator.next()).to.be.deep.equal({
                    value: undefined,
                    done: true
                })
            }
        })

        it('if second parameter is 3, it returns the first parameter three times', function () {
            expect([...Iterum([8]).repeat(3)]).to.be.deep.equal([8, 8, 8])
        })

        it('ends with {value: undefined, done: true}', function () {
            const iterator = Iterum([8]).repeat(3)[Symbol.iterator]()
            let end
            do {
                end = iterator.next()
            } while (!end.done)
            expect(end).to.be.deep.equal({
                value: undefined,
                done: true
            })
        })

        it('with empty iterable and Infinity repetition, it returns empty iterable', function () {
            const iterable = Iterum([]).repeat(Infinity)
            expect([...iterable]).to.be.deep.equal([])
        })

        describe('With more complex iterum instance', function () {
            it('works properly', function () {
                const values = [...Iterum([1, 3, 2]).repeat(3)]
                expect(values).to.be.deep.equal([1, 3, 2, 1, 3, 2, 1, 3, 2])
            })
        })

        describe('converting iterum instance to array', function () {
            it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
                const iterum = Iterum([8]).repeat(3)
                const iterator = iterum[Symbol.iterator]()
                expect([...iterator]).to.be.deep.equal([...iterum])
            })
        })

        describe('bad arguments', function () {
            it('throws an exception if it does not have parameters', function () {
                function foo () {
                    Iterum('foo').repeat()
                }
                expect(foo).to.throw(TypeError,
                    /undefined is not a number/)
            })
            it('throws an exception when the second parameter is not a number', function () {
                function foo () {
                    Iterum('foo').repeat('bar')
                }
                expect(foo).to.throw(TypeError,
                    /bar is not a number/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const repeatIterable = Iterum.repeat(2, [5, 7, 10])
            expect([...repeatIterable]).to.be.deep.equal([5, 7, 10, 5, 7, 10])
        })

        it('throws an error if first parameter is not a number', function () {
            function test () {
                Iterum.repeat('a', [5, 7, 10, 5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^a is not a number$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.repeat(3, -15)
            }
            expect(test).to.throw(TypeError,
                /^-15 is not an Iterable instance$/)
        })
    })
})
