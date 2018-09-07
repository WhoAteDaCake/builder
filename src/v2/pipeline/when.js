const { run } = require('./run');

const nthArgument = n => process.argv[n];

function when(mode, scripts, nth = 2) {
  return config => {
    if (nthArgument(nth) !== mode) {
      return config;
    }
    return run(scripts, config);
  };
}

module.exports = when;
