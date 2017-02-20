/**
 * @module lib/resolve
 * @since 1.0.0
 */

/**
 * Resolve dot notation string
 *
 * @param  {String} string - Dot notation representation
 * @param  {Object=} context - Object to start notation search (defaults to global scope)
 * @return {Any} Whatever it finds / undefined
 *
 * @example resolve('top_level.nested.value', data_object)
 */
function resolve(string = '', context) {
    if (typeof string !== 'string') {
        throw new TypeError('First argument must be a string');
    }

    return string
        .split('.')
        .reduce((previous, current) => typeof previous === 'object' ? previous[current] : previous, (context || this));
}

module.exports = resolve;
