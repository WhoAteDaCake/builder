const path = require('path');
const prettier = require('prettier');
const { getFiles } = require('./utils');

module.exports = builder => initial => {
  const options = builder.deepMerge(
    {
      prettier: {
        file: path.join(initial.home, '.prettierrc'),
        overrides: {},
      },
    },
    initial
  );
  const { build, files } = options;
  const { fileNames, prefix } = getFiles(options);
};
