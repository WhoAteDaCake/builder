const R = require('ramda');
const checkForDebug = require('../helpers/checkForDebug');
const configure = require('./configure');

function run(scripts, initial = {}) {
  return scripts.reduce((value, fn) => fn(value), initial);
}

const runC = R.curryN(2, run);

// Because we want to only show warning once
function start(scripts, initial) {
  checkForDebug();
  return run([configure()].concat(scripts), initial);
}

module.exports = { run, start, runC };
