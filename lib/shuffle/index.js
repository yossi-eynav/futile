/**
 * @module lib/shuffle
 * @since 1.0.0
 */

/**
 * Shuffle array
 *
 * @param  {Array}  array - An array
 * @param  {Boolean|true} mutate - whether to mutate the original array
 * @return {Array} The shuffled array
 *
 * @example shuffle([1, 2, 3], false)
 */
function shuffle(array = [], mutate) {
    if (!(array instanceof Array)) {
        throw new TypeError('First argument must be an array');
    }

    let index = array.length;

    // Don't mutate the original array
    if (mutate === false) {
        array = array.slice(0);
    }

    while (index) {
        const curry = Math.floor(Math.random() * index);
        const item = array[--index];
        array[index] = array[curry];
        array[curry] = item;
    }

    return array;
}

module.exports = shuffle;