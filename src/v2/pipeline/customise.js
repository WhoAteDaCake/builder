const R = require('ramda');

function configure(fn, deep = true) {
  const merge = deep ? R.mergeDeepRight : R.merge;
  // Because this should be as first option passed we don't care about input from pipeline
  return config => merge(config, fn(config));
}
