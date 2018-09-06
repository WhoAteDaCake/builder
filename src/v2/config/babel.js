module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        shippedProposals: true,
        targets: {
          browsers: 'last 2 Chrome versions',
        },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    // ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
  ],
  babelrc: false,
};
