const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const json = require('rollup-plugin-json');

function plugins(build, babelConfig) {
  return [
    postcss({
      plugins: [],
    }),
    resolve(build.resolve),
    commonjs(build.commonjs),
    babel(babelConfig),
    json(build.json),
  ];
}

module.exports = plugins;
