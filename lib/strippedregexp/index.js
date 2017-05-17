/**
 * @module lib/strippedregexp
 * @since 1.5.0
 */

const stripOperators = require('../stripoperators');

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
            args[0] = stripOperators(args[0]);
        }

        super(...args);
    }
}

module.exports = StrippedRegExp;
