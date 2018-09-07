const R = require('ramda');
const { runRollup } = require('../helpers/rollup');
const plugins = require('../helpers/plugins');
const debug = require('../helpers/debug')('pipeline:bundle');

function bundle() {
  return config => {
    const { rollup } = config;
    const action = R.propOr(Promise.resolve(), 'action', config);
    const files = R.mergeDeepRight({
      input: 'src/index.js',
      output: 'build/index.js',
    })(config.files);
    const output = { file: files.output, format: rollup.format };

    function runAsync() {
      return runRollup(
        {
          ...rollup.extra,
          input: files.input,
          plugins: plugins(rollup),
        },
        output
      ).catch(e => debug(e));
    }
    return R.merge(config, { action: action.then(runAsync) });
  };
}

module.exports = bundle;
