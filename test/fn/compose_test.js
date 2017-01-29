var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('compose', function () {
    describe('compose range generators creating a new generator that', function () {
        it('returns array of values [i, j, k] where i <= j <= k', function () {
            var generator = Iterum.compose(
                function* (n, _) {
                    _(_)
                    yield* Range(0, n)
                },
                function* (i, _) {
                    _(i, _)
                    yield* Range(0, i)
                },
                function* (i, j, _) {
                    _(i, j, _)
                    yield* Range(0, j)
                },
                function* (i, j, k) {
                    yield [k, j, i]
                }
            )
            expect([...Iterum(generator.bind(null, 2))]).to.be.deep.equal([
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
            var generator = Iterum.compose(
                function* (_) {
                    _(_)
                    yield* Range(1, 6)
                },
                function* (i) {
                    if (i % 2 === 1) {
                        yield* Range(0, 6, 2)
                    } else {
                        yield 100
                    }
                }
            )
            expect([...Iterum(generator)]).to.be.deep.equal([
                0, 2, 4, 6, 100, 0, 2, 4, 6, 100, 0, 2, 4, 6, 100
            ])
        })

        it('if it is called the same generator twice, then returns the same result', function () {
            var generator = Iterum.compose(
                function* (_) {
                    _(_)
                    yield* Range(1, 6)
                },
                function* (i) {
                    if (i % 2 === 1) {
                        yield* Range(0, 6, 2)
                    } else {
                        yield 100
                    }
                }
            )
            expect([...Iterum(generator)])
                .to.be.deep.equal([...Iterum(generator)])
        })
    })

    describe('test using empty generators', function () {
        it('does not return values when parent generator is empty', function () {
            var generator = Iterum.compose(
                function* (_) {
                    _(_)
                    yield* Range(1, 3)[Symbol.iterator]()
                },
                function* (i) {
                    yield* i % 2 === 1 ? Iterum([1]) : Iterum([])
                },
                function* () {
                    yield* [1, 2, 3]
                }
            )
            expect([...Iterum(generator)]).to.be.deep.equal([
                1, 2, 3, 1, 2, 3
            ])
        })
    })

    describe('when 0 arguments are passed', function () {
        it('empty generator is created', function () {
            var generator = Iterum.compose()
            expect([...Iterum(generator)]).to.be.deep.equal([])
        })
    })
})
