/**
 * @module lib/sequence
 * @since 1.2.0
 */
const flow = require('../flow');

/**
 * A simpler interface to Flow for plain sequences of steps
 * @param  {...Function} steps All functions for the sequence
 * @return {undefined} No return value
 *
 * @example
 * sequence(
 *   (next) => {
 *     console.log('hello');
 *     next();
 *   },
 *   (next) => { console.log(','); next() }),
 *   () => console.log('World')
 * );
 */
module.exports = (...steps) => {
    const _seq = flow();

    steps.forEach((step) => _seq.step(step));
    _seq.go();
};
