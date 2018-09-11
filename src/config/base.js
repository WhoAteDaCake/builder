module.exports = {
  meta: {
    home: process.cwd(),
  },
  files: require('./files'),
  build: {
    rollup: require('./rollup'),
    babel: require('./babel'),
  },
};
