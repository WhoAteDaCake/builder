const R = require('ramda');
const { DEBUG_PREFIX } = require('../config/debug');

const debugEnv = R.pathOr('', ['env', 'DEBUG']);

function checkForDebug() {
  if (!debugEnv(process).includes(DEBUG_PREFIX)) {
    console.warn(
      [
        `Prefix not found in DEBUG variable, errors won't be shown.`,
        `Set DEBUG=${DEBUG_PREFIX}* to enable them`,
      ].join('\n')
    );
  }
}

module.exports = checkForDebug;
