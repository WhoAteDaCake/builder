function run(scripts, initial = {}) {
  return scripts.reduce((value, fn) => fn(value), initial);
}

module.exports = run;
