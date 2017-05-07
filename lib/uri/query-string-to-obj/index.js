/**
 * @module lib/uri/query-string-to-obj
 * @description Convert query string structure to a Javascript object
 * @requires lib/uri/break-pair
 * @since 1.4.0
 */

const breakPair = require('../break-pair');

/**
 * Convert query string to object
 * @param  {String} string Complete query string (w/o the mod)
 * @return {Object} Key value pairs
 *
 * @example queryStringToObject('param1=value1&param2=value2');
 * // {param1: 'value1', param2: 'value2'}
 */
module.exports = (string = '') => Object.assign(...string.split('&').map(breakPair));
