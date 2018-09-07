const R = require('ramda');
const path = require('path');
const { runRollup } = require('../helpers/rollup');
const plugins = require('../helpers/plugins');
const debug = require('../helpers/debug')('pipeline:library');
const { getFiles } = require('../helpers/files');

function library() {
  return config => {
    const { rollup } = config;
    const action = R.propOr(Promise.resolve(), 'action', config);
    const files = R.mergeDeepRight({
      input: 'src',
      output: 'es5',
    })(config.files);

    function buildFile(name, prefix) {
      const outputFile = prefix ? name.replace(prefix, '') : name;
      const outputFilePath = path.join(files.output, outputFile);
      const output = { file: outputFilePath, format: rollup.format };
      return runRollup(
        {
          ...rollup.extra,
          input: name,
          plugins: plugins(rollup),
        },
        output
      ).catch(e => debug(e));
    }

    function runAsync() {
      const { names, prefix } = getFiles(files);
      return Promise.all(names.map(name => buildFile(name, prefix)));
    }
    return R.merge(config, { action: action.then(runAsync) });
  };
}

module.exports = library;
