const R = require('ramda');
const path = require('path');
const { removeDir } = require('../helpers/files');
const { runRollup } = require('../helpers/rollup');
const plugins = require('../helpers/plugins');
const debug = require('../helpers/debug')('pipeline:bundle');

function bundle(local) {
  return shared => {
    const config = R.mergeDeepRight(shared, local);
    const { rollup, babel } = config.build;
    const action = R.propOr(Promise.resolve(), 'action', config);
    const files = R.mergeDeepRight({
      input: 'src/index.js',
      output: 'build/index.js',
    })(config.files);
    const output = { file: files.output, format: rollup.format };
    const outputDir = path.dirname(output.file);

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
      action: action.then(() => removeDir(config.meta.home, outputDir)).then(runAsync),
    });
  };
}

module.exports = bundle;
