/**
 * @module lib/global
 * @since 1.1.0
 * @description exposes the global object (self | global | window)
 */

module.exports = (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global) || // eslint-disable-line no-undef
    (typeof window === 'object' && window.window === window && window);
