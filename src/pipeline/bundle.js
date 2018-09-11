const R = require('ramda');
const { removeDir } = require('../helpers/files');
const { runRollup } = require('../helpers/rollup');
const plugins = require('../helpers/plugins');
const debug = require('../helpers/debug')('pipeline:bundle');

function bundle() {
  return config => {
    const { rollup, babel } = config.build;
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
          plugins: plugins(rollup, babel),
        },
        output
      ).catch(e => debug(e));
    }
    return R.merge(config, {
      action: action.then(() => removeDir(config.meta.home, files.output)).then(runAsync),
    });
  };
}

module.exports = bundle;
