/**
 * @module lib/strippedregexp
 * @since 1.5.0
 */

/**
 * Regex operators match
 * @private
 * @type {RegExp}
 */
const OPERATORS_MATCH = /[|\\{}()[\]^$+*?.]/g;

/**
 * return a string with stripped operators
 * @private
 * @param  {String} string
 * @return {String} a string safe for RegExp
 *
 * @example strip('weird things)') // => 'weird things'
 */
const strip = (string = '') => string.replace(OPERATORS_MATCH, '');

/**
 * @class StrippedRegExp
 * @extends RegExp
 * @classdesc Create a RegExp from string ignoring operators
 *
 * @param {String|RegExp} pattern
 * @param {String} [flags]
 * @returns {RegExp} a regex object ignoring operators
 *
 * @example new StrippedRegExp('weird stuff)', 'g')
 */
class StrippedRegExp extends RegExp {
    constructor(...args) {
        if (typeof args[0] === 'string') {
            args[0] = strip(args[0]);
        }

        super(...args);
    }
}

module.exports = StrippedRegExp;
