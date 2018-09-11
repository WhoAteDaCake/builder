const fs = require('fs-extra');
const path = require('path');
const R = require('ramda');
const dirTree = require('directory-tree');

const flattenFiles = R.reduce((acc, item) => {
  const entries = item.children ? flattenFiles(item.children) : [item.path];
  return R.concat(acc, entries);
}, []);

function getFiles(files) {
  if (Array.isArray(files.input)) {
    return { names: files.input, prefix: undefined };
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
  return { names: fileList, prefix: files.input };
}

function formatPath(base, entry) {
  if (path.isAbsolute(entry)) {
    return entry;
  }
  return path.join(base, entry);
}

function removeDir(base, dir) {
  const fullPath = formatPath(base, dir);
  return new Promise((res, rej) => {
    fs.remove(fullPath, (err, resp) => (err ? rej(err) : res(resp)));
  });
}

module.exports = { getFiles, formatPath, removeDir };
