const R = require('ramda');
const debug = require('../helpers/debug')('pipeline:customise');

function customise(fn, deep = true) {
  const merge = deep ? R.mergeDeepRight : R.merge;
  return config => {
    const result = fn(config);
    if (result === undefined) {
      debug('Customisation function returned nothing, did you forget to wrap return?');
    }
    return merge(config, result);
  };
}
module.exports = customise;
