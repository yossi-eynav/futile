/**
 * @module lib/pluck
 * @since 1.0.0
 */

/**
 * Pluck values of a certain key from array of objects
 *
 * @param  {Object[]}  objects Array of objects
 * @param  {String} key The key we want to pluck
 * @return {Array}         [description]
 *
 * @example pluck([{key_name: 1}, {key_name: 2}], 'key_name')
 */
function pluck(objects = [], key) {
    if (!(objects instanceof Array)) {
        throw new TypeError('First argument must be an array');
    }

    return objects.map((item) => item[key]);
}

module.exports = pluck;
