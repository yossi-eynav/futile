const index = require('./index');

const flat = Object.assign.apply(Object, Object.keys(index).map((key) => index[key]));

/**
 * Helpers
 * @exports flat
 *
 * @description A collection of helpers
 * @requires str
 * @requires arr
 * @requires func
 */
module.exports = flat;

