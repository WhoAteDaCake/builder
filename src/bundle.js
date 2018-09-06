const path = require('path');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const json = require('rollup-plugin-json');

const { getFiles } = require('./utils');

module.exports = builder => initial => {
  const options = builder.deepMerge(
    {
      files: {
        input: 'src/components/index.js',
        output: 'build/index.js',
        extensions: /\.(js|jsx|css|less|sass)$/,
        exclude: [],
      },
    },
    initial
  );
  const { build, files } = options;
  const output = { file: files.output, format: build.format };

  const plugins = () => [
    postcss({
      plugins: [],
    }),
    resolve(build.resolve),
    commonjs(build.commonjs),
    babel(build.babel),
    json(build.json),
  ];
  return rollup({
    input: files.input,
    plugins: plugins(),
    external: build.external,
    ...build.rollup,
  })
    .then(bundle => bundle.generate(output).then(() => bundle))
    .then(bundle => bundle.write(output))
    .catch(e => console.error(e));
};
