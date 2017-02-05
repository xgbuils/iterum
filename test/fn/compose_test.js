const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('compose', function () {
    describe('compose Iterum.range iterables creating a new generator that', function () {
        it('returns array of values [i, j, k] where i <= j <= k', function () {
            const generator = Iterum.compose(
                function* (n, _) {
                    _(_)
                    yield* range(0, n)
                },
                function* (i, _) {
                    _(i, _)
                    yield* range(0, i)
                },
                function* (i, j, _) {
                    _(i, j, _)
                    yield* range(0, j)
                },
                function* (i, j, k) {
                    yield [k, j, i]
                }
            )
            expect([...generator(2)]).to.be.deep.equal([
                [0, 0, 0],
                [0, 0, 1],
                [0, 1, 1],
                [1, 1, 1],
                [0, 0, 2],
                [0, 1, 2],
                [1, 1, 2],
                [0, 2, 2],
                [1, 2, 2],
                [2, 2, 2]
            ])
        })

        it('returns values following this sequence: (0, 2, 4, 6, 100) x 3', function () {
            const generator = Iterum.compose(
                function* (_) {
                    _(_)
                    yield* range(1, 6)
                },
                function* (i) {
                    if (i % 2 === 1) {
                        yield* range(0, 6, 2)
                    } else {
                        yield 100
                    }
                }
            )
            expect([...generator()]).to.be.deep.equal([
                0, 2, 4, 6, 100, 0, 2, 4, 6, 100, 0, 2, 4, 6, 100
            ])
        })

        it('if it is called the same generator twice, then returns the same result', function () {
            const generator = Iterum.compose(
                function* (_) {
                    _(_)
                    yield* range(1, 6)
                },
                function* (i) {
                    if (i % 2 === 1) {
                        yield* range(0, 6, 2)
                    } else {
                        yield 100
                    }
                }
            )
            expect([...generator()])
                .to.be.deep.equal([...generator()])
        })
    })

    describe('test using empty generators', function () {
        it('does not return values when parent generator is empty', function () {
            const generator = Iterum.compose(
                function* (_) {
                    _(_)
                    yield* range(1, 3)[Symbol.iterator]()
                },
                function* (i) {
                    yield* i % 2 === 1 ? Iterum([1]) : Iterum([])
                },
                function* () {
                    yield* [1, 2, 3]
                }
            )
            expect([...generator()]).to.be.deep.equal([
                1, 2, 3, 1, 2, 3
            ])
        })
    })

    describe('when 0 arguments are passed', function () {
        it('empty generator is created', function () {
            const generator = Iterum.compose()
            expect([...generator()]).to.be.deep.equal([])
        })
    })
})
