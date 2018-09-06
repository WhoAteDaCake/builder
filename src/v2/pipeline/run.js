function run(scripts) {
  return scripts.reduce((value, fn) => fn(value), {});
}

module.exports = run;
