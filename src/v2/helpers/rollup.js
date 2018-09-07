const { rollup } = require('rollup');

function runRollup(config, output) {
  return rollup(config)
    .then(bundle => bundle.generate(output).then(() => bundle))
    .then(bundle => bundle.write(output));
}

module.exports = { runRollup };
