module.exports = class Iterable {
    static [Symbol.hasInstance] (instance) {
        return instance != null && typeof instance[Symbol.iterator] === 'function'
    }
}
