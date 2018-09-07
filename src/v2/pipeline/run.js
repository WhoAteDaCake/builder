const checkForDebug = require('../helpers/checkForDebug');

function run(scripts, initial = {}) {
  return scripts.reduce((value, fn) => fn(value), initial);
}
// Because we want to only show warning once
function start(scripts, initial) {
  checkForDebug();
  return run(scripts, initial);
}

module.exports = { run, start };
