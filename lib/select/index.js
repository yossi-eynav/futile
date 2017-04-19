/**
 * @module lib/select
 * @since 1.3.0
 */


/**
 * Return an object's shallow copy filtering members based by a function
 *
 * @param  {Object} original key value pair
 * @param  {Function} condition function accepting key, value as parameters and returning a boolean
 * @return {Object} key value pair
 *
 * @example select({a:1, b:2, c:3, d:4}, (key, val) => val > 2);
 * // {c:3, d:4}
 */
module.exports = (original, condition = () => false) => {
    const result = {};

    for (const key in original) {
        if (condition(key, original[key])) {
            result[key] = original[key];
        }
    }

    return result;
};
