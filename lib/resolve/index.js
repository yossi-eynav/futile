/**
 * @module lib/resolve
 * @since 1.0.0
 */

const _global = require('../global');

/**
 * Resolve dot notation string
 *
 * @param  {String} string - Dot notation representation
 * @param  {Object=} context - Object to start notation search (defaults to global scope)
 * @return {Any} Whatever it finds / undefined
 *
 * @example resolve('top_level.nested.value', data_object)
 */
module.exports = (string = '', context = _global) => string
    .split('.')
    .reduce((previous, current) => typeof previous === 'object' ? previous[current] : previous, context);
