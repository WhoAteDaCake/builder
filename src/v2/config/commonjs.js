module.exports = {
  include: 'node_modules/**',
  ignore: [],
  namedExports: {
    'node_modules/react/index.js': ['createElement', 'PureComponent', 'Component'],
    'node_modules/react-dom/index.js': ['findDOMNode', 'createPortal', 'render'],
  },
};
