/**
 * @module lib/pluck
 * @since 1.0.0
 */

/**
 * Pluck values of a certain key from array of objects
 *
 * @param  {Object[]}  objects Array of objects
 * @param  {String} key The key we want to pluck
 * @return {Array}  An array of the values stored in the specified key of each object
 *
 * @example pluck([{key_name: 1}, {key_name: 2}], 'key_name')
 */
module.exports = (objects = [], key) => {
    if (!(objects instanceof Array)) {
        throw new TypeError(`futile#pluck expects first argument to be an array, got a ${typeof objects}`);
    }

    return objects.map((item) => item[key]);
};
