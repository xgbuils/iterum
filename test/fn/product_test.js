const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('Iterum.product', function () {
    describe('given 1 list', function () {
        it('cartesian product of one iterable with one element', function () {
            const iterable = Iterum([[1]]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([[1]])
        })

        it('cartesian product of one iterable with one element', function () {
            const iterable = Iterum([[1, 2, 3]]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([[1], [2], [3]])
        })
    })
    describe('given 2 lists, it makes cartesian product of these lists', function () {
        it('2 no empty lists', function () {
            const iterable = Iterum([
                [1, 2],
                [3, 4]
            ]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [1, 3],
                    [2, 3],
                    [1, 4],
                    [2, 4]
                ])
        })

        it('first list is empty', function () {
            const iterable = Iterum([
                [],
                [1, 2, 3, 4]
            ]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })

        it('second list is empty', function () {
            const iterable = Iterum([
                [1, 2, 3, 4],
                []
            ]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })

        it('2 lists are empty', function () {
            const iterable = Iterum([
                [],
                []
            ]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })

        it('first list has one element', function () {
            const iterable = Iterum([
                [0],
                [1, 2, 3, 4]
            ]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [0, 1],
                    [0, 2],
                    [0, 3],
                    [0, 4]
                ])
        })
    })

    describe('one list', function () {
        it('no empty list', function () {
            const iterable = Iterum([[1, 2, 3, 4]]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([[1], [2], [3], [4]])
        })

        it('empty list', function () {
            const iterable = Iterum([[]]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })
    })

    describe('zero lists', function () {
        it('returns empty list', function () {
            const iterable = Iterum([]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })
    })

    describe('more than 2 lists', function () {
        it('3 no empty lists with the same length', function () {
            const iterable = Iterum([
                [1, 2],
                [3, 4],
                [5, 6]
            ]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [1, 3, 5],
                    [2, 3, 5],
                    [1, 4, 5],
                    [2, 4, 5],
                    [1, 3, 6],
                    [2, 3, 6],
                    [1, 4, 6],
                    [2, 4, 6]
                ])
        })

        it('3 no empty lists with different length', function () {
            const iterable = Iterum([
                [1, 2],
                [3],
                [4, 5, 6]
            ]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [1, 3, 4],
                    [2, 3, 4],
                    [1, 3, 5],
                    [2, 3, 5],
                    [1, 3, 6],
                    [2, 3, 6]
                ])
        })

        it('there is an empty list', function () {
            const iterable = Iterum([
                [1, 2, 3],
                new Set([3, 4, 5, 3, 2, 4]),
                [],
                [4, 5, 6]
            ]).product()
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })
    })

    it('product of potentially infinite iterables', function () {
        const iterable = Iterum(new Set([
            range(0, Infinity),
            range(0, Infinity)
        ]))
        .product()
        .take(5)
        expect([...iterable].map(e => [...e]))
            .to.be.deep.equal([
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0]
            ])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterable = Iterum([
                [1, 3],
                [6, 10]
            ]).product()
            const iterator = iterable[Symbol.iterator]()
            expect([...iterator].map(e => [...e]))
                .to.be.deep.equal([...iterable].map(e => [...e]))
        })
    })

    describe('If cartesian product instance is passed as param of Iterum', function () {
        it('returns the same reference', function () {
            const iterable = [[1, 5]]
            const a = Iterum(iterable).product()
            const b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect([...a].map(e => [...e]))
                .to.be.deep.equal([...b].map(e => [...e]))
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.product([
                new Set([3, 8, 5]),
                'ac'
            ])
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([
                    [3, 'a'],
                    [8, 'a'],
                    [5, 'a'],
                    [3, 'c'],
                    [8, 'c'],
                    [5, 'c']
                ])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const iterable = Iterum.product({})
            expect([...iterable].map(e => [...e]))
                .to.be.deep.equal([])
        })
    })
})
