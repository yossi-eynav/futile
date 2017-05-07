/**
 * @module lib/uri/break-pair
 * @description Break a query key=value pair to an array containing key and value respectively
 * @requires lib/uri/valid-value
 * @since 1.4.0
 */

const validValue = require('../valid-value');

/**
 * Convert single query item to object
 * @param  {String} item Representation of key value pair 'key=value'
 * @return {Object} One key value pair object
 *
 * @example breakPair('key=value');
 * // {key: 'value'}
 */
module.exports = function breakPair(item) {
    const [key, value] = item.split('=');

    return key === '' ? {} : {[key]: validValue(value)};
};
