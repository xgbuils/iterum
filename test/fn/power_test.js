const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('Iterum.power', function () {
    describe('power of 1', function () {
        it('iterable with one element', function () {
            const iterable = Iterum([1]).power(1)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([[1]])
        })

        it('iterable with several elements', function () {
            const iterable = Iterum([1, 2, 3]).power(1)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([[1], [2], [3]])
        })
    })
    describe('power of 2', function () {
        it('2 no empty lists', function () {
            const iterable = Iterum([1, 2]).power(2)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [1, 1],
                    [2, 1],
                    [1, 2],
                    [2, 2]
                ])
        })

        it('iterable is empty', function () {
            const iterable = Iterum([]).power(2)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })

        it('iterable has one element', function () {
            const iterable = Iterum([0]).power(2)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([[0, 0]])
        })

        it('iterable has more than one element', function () {
            const iterable = Iterum([1, 2, 3]).power(2)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [1, 1],
                    [2, 1],
                    [3, 1],
                    [1, 2],
                    [2, 2],
                    [3, 2],
                    [1, 3],
                    [2, 3],
                    [3, 3]
                ])
        })
    })

    describe('more than 2 lists', function () {
        it('3 no empty lists with the same length', function () {
            const iterable = Iterum([0, 1]).power(3)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [0, 0, 0],
                    [1, 0, 0],
                    [0, 1, 0],
                    [1, 1, 0],
                    [0, 0, 1],
                    [1, 0, 1],
                    [0, 1, 1],
                    [1, 1, 1]
                ])
        })
    })

    describe('infinity', function () {
        it('power of potentially infinite iterable', function () {
            const naturals = range(0, Infinity)
            const iterable = Iterum(naturals)
                .power(5)
                .take(5)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0],
                    [2, 0, 0, 0, 0],
                    [3, 0, 0, 0, 0],
                    [4, 0, 0, 0, 0]
                ])
        })

        it('infinite exponent', function () {
            const iterable = Iterum([0, 1])
                .power(Infinity)
                .map(e => e.slice(0, 3))
                .take(6)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [0, 0, 0],
                    [1, 0, 0],
                    [0, 1, 0],
                    [1, 1, 0],
                    [0, 0, 1],
                    [1, 0, 1]
                ])
        })

        it('infinite iterable with infinite exponent', function () {
            const naturals = Iterum.range(0, Infinity)
            const iterable = Iterum(naturals)
                .power(Infinity)
                .map(e => e.take(2))
                .take(6)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [0, 0],
                    [1, 0],
                    [2, 0],
                    [3, 0],
                    [4, 0],
                    [5, 0]
                ])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when it is passed no number in 1st argument', function () {
            function foo () {
                Iterum([1, 2, 3]).power()
            }
            expect(foo).to.throw(TypeError,
                /^undefined is not a number$/)
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterable = Iterum([1, 3]).power(3)
            const iterator = iterable[Symbol.iterator]()
            expect([...iterator].map(e => [...e]))
                .to.be.deep.equal([...iterable].map(e => [...e]))
        })
    })

    describe('If cartesian power instance is passed as param of Iterum', function () {
        it('returns the same reference', function () {
            const iterable = [1, 5]
            const a = Iterum(iterable).power(3)
            const b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect([...a].map(e => [...e]))
                .to.be.deep.equal([...b].map(e => [...e]))
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.power(new Set([3, 8]), 2)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [3, 3],
                    [8, 3],
                    [3, 8],
                    [8, 8]
                ])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const iterable = Iterum.power({}, 2)
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })
    })
})
