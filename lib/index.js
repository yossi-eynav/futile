/**
 * @module index
 * @since 1.0.0
 * @description A nested collection of helpers
 */

/**
 * Helpers
 *
 * @requires lib/capitalize
 * @requires lib/flow
 * @requires lib/interpolate
 * @requires lib/pluck
 * @requires lib/resolve
 * @requires lib/safe
 * @requires lib/select
 * @requires lib/sequence
 * @requires lib/shuffle
 * @requires lib/uri
 */
module.exports = {
    capitalize: require('./capitalize'),
    flow: require('./flow'),
    interpolate: require('./interpolate'),
    pluck: require('./pluck'),
    resolve: require('./resolve'),
    safe: require('./safe'),
    select: require('./select'),
    sequence: require('./sequence'),
    shuffle: require('./shuffle'),
    uri: require('./uri')
};
