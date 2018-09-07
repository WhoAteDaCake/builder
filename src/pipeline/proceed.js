const R = require('ramda');

function proceed() {
  return config => R.merge(config, { action: Promise.resolve() });
}

module.exports = proceed;
