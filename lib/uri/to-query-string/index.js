/**
 * @module lib/uri/to-query-string
 * @since 1.4.0
 */

/**
 * Return a valid URL param value
 * @private
 * @param  {String} A value for url param value
 * @return {String} URI encoded value following the equal sign. Empty string returns nothing
 *
 * @example
 * equals('Hello'); // '=Hello'
 * equals('$100'); // '=%24100'
 * equals(''); // ''
 */
const equals = (value) => value === true ? '' : `=${encodeURIComponent(value)}`;

/**
 * Convert object to a string with a URL params notation
 * @param  {Object} Parameters object - Key value pair
 * @return {String} String with a URL params notation
 */
module.exports = (params = {}) => Object.keys(params).map((key) => key + equals(params[key])).join('&');
