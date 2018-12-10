const R = require('ramda');
const path = require('path');
const { runRollup } = require('../helpers/rollup');
const plugins = require('../helpers/plugins');
const debug = require('../helpers/debug')('pipeline:library');
const { getFiles, removeDir } = require('../helpers/files');

function library(local) {
	return (shared) => {
		const config = R.mergeDeepRight(shared, local);
		const { rollup, babel } = config.build;
		const action = R.propOr(Promise.resolve(), 'action', config);
		const files = R.mergeDeepRight({
			input: 'src',
			output: 'es5'
		})(config.files);

		function buildFile(name, prefix) {
			const outputFile = prefix ? name.replace(prefix, '') : name;
			const outputFilePath = path.join(files.output, outputFile);
			const output = { file: outputFilePath, format: rollup.format };
			return runRollup(
				{
					...rollup.extra,
					input: name,
					plugins: plugins(rollup, babel)
				},
				output
			);
		}

		function run() {
			const { names, prefix } = getFiles(files);
			return removeDir(config.meta.home, files.output).then(() =>
				Promise.all(names.map((name) => buildFile(name, prefix)))
			);
		}
		// Not using merge here speeds it up
		config.action = action.then(run);
		return config;
	};
}

module.exports = library;
