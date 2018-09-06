const R = require('ramda');
const baseConfig = require('../config/base');

function configure(options = {}) {
  // Because this should be as first option passed we don't care about input from pipeline
  return () => R.mergeDeepRight(baseConfig, options);
}
