/**
 * @module lib/deepasign
 * @since 1.7.0
 */

/**
 * [description]
 * @param  {Object}    target Target object to assign to
 * @param  {...Object} others The objects from which to deep assign respective values
 * @return {Object} Original target, assigned
 *
 * @example deepasign({hash: {a: 1}}, {hash: {b: 2, c: 0}}, {hash: {c: 3}}) // {hash: {a: 1, b:2, c: 3}}
 */
module.exports = (target, ...others) => {
    assignable(target) && others.forEach((other) => assign(target, other));

    return target;
};

/**
 * Checks this object is an assignable object
 * @private
 * @param  {Object} target
 * @return {Boolean} is this object "assignable"
 */
const assignable = (target) => isObject(target) && ![undefined, null].includes(target);

/**
 * Checks a target is an object, excludes null
 * @private
 * @param  {Any} target [description]
 * @return {Boolean} Is the target an object
 */
const isObject = (target) => ['object', 'function'].includes(typeof target) && target !== null;

/**
 * Delegate to assign keys and symbols
 * @private
 * @param  {Object} to   Target object to assign to
 * @param  {Object} from The object from which to assign respective values
 * @return {Object} Original to, assigned
 */
function assign(to, from) {
    to = Object(to);
    from = Object(from);

    assignKeys(to, from);
    assignSymbols(to, from);

    return to;
}

/**
 * Assign second object keys to first
 * @private
 * @param  {Object} to   Target object to assign to
 * @param  {Object} from The object from which to assign respective values
 * no return value
 */
const assignKeys = (to, from) => Object.keys(from)
    .forEach((key) => assignKey(to, from, key));

/**
 * Assign second object symbols to first
 * @private
 * @param  {Object} to   Target object to assign to
 * @param  {Object} from The object from which to assign respective values
 * no return value
 */
const assignSymbols = (to, from) => getOwnPropertySymbols(from)
    .forEach((symbol) => assignKey(to, from, symbol));

/**
 * Perform getOwnPropertySymbols when available
 * @private
 * @param  {Object} object
 * @return {Array} List of symbol keys (falls back to an empty array)
 */
const getOwnPropertySymbols = (object) => Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];

/**
 * assign one key from one object to the target
 * @private
 * @param  {Object} to   Target object to assign to
 * @param  {Object} from The object to assign value
 * @param  {String|Symbol} key
 * no return value
 */
function assignKey(to, from, key) {
    const easyAssign = !to.hasOwnProperty(key) || !isObject(from[key]);

    to[key] = easyAssign ? from[key] : assign(Object.assign({}, to[key]), from[key]);
}
