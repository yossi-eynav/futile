/**
 * @module lib/uri/valid-value
 * @since 1.4.0
 */

/**
 * Return valid values for a URL parameter's value
 * @param  {String} value The value
 * @return {String|Boolean} empty string is considered true, everything else gets URI decoded
 *
 * @example validValue('%2425');
 * // '$25'
 */
module.exports = (value) => value === undefined ? true : decodeURIComponent(value);
