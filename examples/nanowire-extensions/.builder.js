const pkg = require('./package.json');

// FIND out why react-reconciler is inlined
module.exports = (builder, initial) => {
  builder
    .when(initial.mode === 'library', () => {
      builder.update(options =>
        builder.deepMerge(options, {
          files: { exclude: [/Demo/], input: 'src' },
        })
      );
    })
    .when(initial.mode === 'bundle', () => {
      builder.update(options =>
        builder.deepMerge(options, {
          files: { exclude: [/Demo/], output: pkg.main, input: 'src/index.js' },
        })
      );
    });
};
