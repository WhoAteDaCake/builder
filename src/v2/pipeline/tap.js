function tap(fn) {
  return config => {
    fn(config);
    return config;
  };
}

module.exports = tap;
