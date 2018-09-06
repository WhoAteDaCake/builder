const defaultBabelConfig = {
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

const build = {
  format: 'cjs',
  babel: defaultBabelConfig,
  resolve: {
    module: true,
    main: true,
    browser: true,
    extensions: ['.mjs', '.js', '.jsx', '.json'],
  },
  commonjs: {
    include: 'node_modules/**',
    ignore: [],
    namedExports: {
      'node_modules/react/react.js': ['createElement', 'PureComponent', 'Component'],
      'node_modules/react-dom/index.js': ['findDOMNode', 'createPortal', 'render'],
    },
  },
  // Fixes unexpected token issue
  json: {
    include: 'node_modules/**',
  },
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  rollup: {
    onwarn(message) {
      // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
      // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
      if (message.code === 'THIS_IS_UNDEFINED') {
        return;
      }
      console.log(message);
    },
  },
};

module.exports = { build };
