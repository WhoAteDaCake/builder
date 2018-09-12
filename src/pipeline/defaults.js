const R = require('ramda');

function defaults(initial) {
  return shared => R.mergeDeepRight(initial, shared);
}

module.exports = defaults;
