const { rollup } = require('rollup');

function runRollup(config) {
  return rollup(config)
    .then(bundle => bundle.generate(output).then(() => bundle))
    .then(bundle => bundle.write(output));
}

module.exports = { runRollup };
