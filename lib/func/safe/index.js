/**
 * @module func/safe
 */

/**
 * No operation function accept anything
 * @private
 * @return {undefined} return nothing
 */
function noop() { /* Do nothing */ }

/**
 * Perform a safe call on a method. Ignore other types
 *
 * @param  {Function}  fn      Function to run
 * @param  {Object=}   context The context to call the function on
 * @param  {...Any}    args    Other arguments to pass onto the function
 * @return {Any}       Result of the function
 *
 * @example safe(fn, this, 'a', 'b', 'c')
 */
function safe(fn, context, ...args) {
    return (typeof fn === 'function' ? fn : noop).apply(context || null, args || []);
}

module.exports = safe;
