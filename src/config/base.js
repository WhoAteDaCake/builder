module.exports = {
  argv: process.argv,
  meta: {
    home: process.cwd(),
  },
  files: require('./files'),
  build: {
    rollup: require('./rollup'),
    babel: require('./babel'),
  },
};
