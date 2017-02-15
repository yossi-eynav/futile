/**
 * @module arr/pluck
 */

/**
 * Pluck values of a certain key from array of objects
 *
 * @param  {Array}  objects Array of objects
 * @param  {String} key The key we want to pluck
 * @return {Array}         [description]
 *
 * @example pluck([{key_name: 1}, {key_name: 2}], 'key_name')
 */
function pluck(objects = [], key) {
    return objects.map((item) => item[key]);
}

module.exports = pluck;
