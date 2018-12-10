const R = require('ramda');
const path = require('path');
const { removeDir } = require('../helpers/files');
const { runRollup } = require('../helpers/rollup');
const plugins = require('../helpers/plugins');
const debug = require('../helpers/debug')('pipeline:bundle');

function bundle(local) {
	return (shared) => {
		const config = R.mergeDeepRight(shared, local);
		const { rollup, babel } = config.build;
		const action = R.propOr(Promise.resolve(), 'action', config);
		const files = R.mergeDeepRight({
			input: 'src/index.js',
			output: 'build/index.js'
		})(config.files);
		const output = { file: files.output, format: rollup.format };
		const outputDir = path.dirname(output.file);

		const run = () =>
			removeDir(config.meta.home, outputDir).then(() =>
				runRollup(
					{
						...rollup.extra,
						input: files.input,
						plugins: plugins(rollup, babel)
					},
					output
				)
			);
		// Not using merge here speeds it up
		config.action = action.then(run);
		return config;
	};
}

module.exports = bundle;
