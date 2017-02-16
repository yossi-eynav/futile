const index = require('./index');

const flat = Object.assign.apply(Object, Object.keys(index).map((key) => index[key]));

/**
 * Helpers
 * @exports flat
 * @since 0.0.1
 *
 * @description A collection of helpers
 * @requires str
 * @requires arr
 * @requires func
 */
module.exports = flat;

