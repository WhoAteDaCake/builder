const path = require('path');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const json = require('rollup-plugin-json');

const { getFiles } = require('./utils');

// NEED TO BREAK FILES INTO CHUNKS to prevent memory overflow
module.exports = builder => initial => {
  const pkg = require(path.join(initial.home, 'package.json'));
  const options = builder.deepMerge(
    {
      files: {
        input: 'src/components',
        output: 'es5',
        extensions: /\.(js|jsx|css|less|sass)$/,
        exclude: [],
      },
      build: {
        external: [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)],
      },
    },
    initial
  );
  const { build, files } = options;
  const { fileNames, prefix } = getFiles(options);

  const plugins = () => [
    postcss({
      plugins: [],
    }),
    resolve(build.resolve),
    commonjs(build.commonjs),
    babel(build.babel),
    json(build.json),
  ];
  const commands = fileNames.map(name => {
    const outputFile = prefix ? name.replace(prefix, '') : name;
    const outputFilePath = path.join(files.output, outputFile);
    const output = { file: outputFilePath, format: build.format };
    return rollup({
      input: name,
      plugins: plugins(),
      external: build.external,
    })
      .then(bundle => bundle.generate(output).then(() => bundle))
      .then(bundle => bundle.write(output))
      .catch(e => console.error(e));
  });
};
