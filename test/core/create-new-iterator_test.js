const {expect} = require('chai')
const createNewIterator = require('../../src/core/create-new-iterator')
const sinon = require('sinon')
const Iterum = require('../../src/index.js')
const {range} = Iterum
const state = {}
state.nextParamsCallback = function (...nextParams) {
    state.nextParams = nextParams
}

describe('createNewIterator', function () {
    describe('constructor does not call next-parameters `_` callback', function () {
        it('returns undefined', function () {
            const item = itemMock(function* () {
                yield* range(0, 3)
            })
            const previous = previousMock(123)
            createNewIterator({}, item, previous, state)
            item.itor.next()
            expect(state.nextParams).to.be.deep.equal(undefined)
        })
    })

    describe('constructor calls next-parameters callback', function () {
        it('returns undefined', function () {
            const _ = state.nextParamsCallback
            const item = itemMock(function* (_) {
                _(1, _, 8)
                yield* range(2, 1, -1)
            })
            const previous = previousMock('buzz')
            createNewIterator({}, item, previous, state)
            item.itor.next()
            expect(state.nextParams).to.be.deep.equal([1, _, 8])
        })
    })

    describe('params of item.ctor', function () {
        describe('last parameter of item.ctor', function () {
            it('is always a next-parameters _ function', function () {
                const item = itemMock(function* (a, b, _) {
                    _(5, 'foo')
                    yield* Iterum(['example'])
                }, 2, 3)
                sinon.spy(item, 'ctor')
                const previous = previousMock('didedu')
                createNewIterator({}, item, previous, state)
                const [{length}] = item.ctor.args
                expect({
                    lastArg: item.ctor.args[0][length - 1],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    lastArg: state.nextParamsCallback,
                    calledOnce: true
                })
            })
        })
        describe('if some parameter of item.args is state.nextParamsCallback', function () {
            it('is replaced by previous.state.value', function () {
                const param = {fizz: 'buzz'}
                const _ = state.nextParamsCallback
                const item = itemMock(function () {
                    return 'anything'
                }, param, _)
                const previous = previousMock('')
                sinon.spy(item, 'ctor')

                createNewIterator({}, item, previous, state)
                expect({
                    args: item.ctor.args[0],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    args: [param, '', _],
                    calledOnce: true
                })
            })
        })
        describe('if some parameter of item.args is state.nextParamsCallback', function () {
            it('is replaced by undefined if previous is not defined', function () {
                const param = {fizz: 'buzz'}
                const _ = state.nextParamsCallback
                const item = itemMock(function () {
                    return 'anything'
                }, param, _, 8)
                const previous = undefined
                sinon.spy(item, 'ctor')

                createNewIterator({}, item, previous, state)
                expect({
                    args: item.ctor.args[0],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    args: [param, undefined, 8, _],
                    calledOnce: true
                })
            })
        })
        describe('if item.args does not have any parameter equal to state.nextParamsCallback', function () {
            it('item.ctor is called with the same parameters', function () {
                const param = {fizz: 'buzz'}
                const _ = state.nextParamsCallback
                const item = itemMock(function () {
                    return 'anything'
                }, param)
                const previous = previousMock('')
                sinon.spy(item, 'ctor')

                createNewIterator({}, item, previous, state)
                expect({
                    args: item.ctor.args[0],
                    calledOnce: item.ctor.calledOnce
                }).to.be.deep.equal({
                    args: [param, _],
                    calledOnce: true
                })
            })
        })
    })
})

function previousMock (value) {
    return {
        state: {
            value
        }
    }
}

function itemMock (ctor, ...args) {
    const mock = {
        ctor
    }
    if (args.length > 0) {
        mock.args = args
    }
    return mock
}
