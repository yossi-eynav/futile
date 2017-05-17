/**
 * @module lib/stripoperators
 * @since 1.6.0
 */

/**
 * Regex operators match
 * @private
 * @type {RegExp}
 */
const OPERATORS_MATCH = /[|\\{}()[\]^$+*?.]/g;

/**
 * return a string with stripped operators
 * @param  {String} string
 * @return {String} a string safe for RegExp
 *
 * @example stripoperators('weird things)') // => 'weird things'
 */
module.exports = (string = '') => string.replace(OPERATORS_MATCH, '');