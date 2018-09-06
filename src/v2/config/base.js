module.exports = {
  format: 'cjs',
  home: process.cwd(),
  babel: require('./babel'),
  resolve: require('./resolve'),
  commonjs: require('./commonjs'),
  json: require('./json.js'),
  rollup: require('./rollup'),
};
