const R = require('ramda');
const dirTree = require('directory-tree');

const flattenFiles = R.reduce((acc, item) => {
  const entries = item.children ? flattenFiles(item.children) : [item.path];
  return R.concat(acc, entries);
}, []);

function getFiles(options) {
  const { home, files } = options;
  if (Array.isArray(files.input)) {
    return { fileNames: files.input, prefix: undefined };
  }
  const config = {
    extensions: files.extensions,
    exclude: files.exclude,
  };
  const fileList = R.pipe(
    input => dirTree(input, config),
    R.propOr([], 'children'),
    flattenFiles
  )(files.input);
  return { fileNames: fileList, prefix: files.input };
}

module.exports = { getFiles };
