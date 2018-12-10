const debug = require('../helpers/debug')('rollup');

function external(id) {
	return !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');
}

function onwarn(message) {
	// Suppress this error message... there are hundreds of them. Angular team says to ignore it.
	// https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
	if (message.code === 'THIS_IS_UNDEFINED') {
		return;
	}
	debug(message.message);
}

module.exports = {
	format: 'cjs',
	resolve: require('./resolve'),
	commonjs: require('./commonjs'),
	json: require('./json.js'),
	extra: {
		external,
		onwarn,
		treeshake: true
	}
};
