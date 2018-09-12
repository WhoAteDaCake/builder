const R = require('ramda');
const baseConfig = require('../config/base');

function configure(local = baseConfig) {
  return shared => R.mergeDeepRight(shared, local);
}

module.exports = configure;
